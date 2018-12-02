/****************************************************************
 * USER CONFIG
 ****************************************************************/

// who should the e-mail go to
var EMAIL_TO = "user@email.com";

// how many previous and next days to also show
var NUM_ADDITIONAL_DAYS = 8;

/****************************************************************
 * CODE
 ****************************************************************/
var TODAY = new Date((new Date()).toDateString());
var ONE_DAY = 24 * 60 * 60 * 1000;

// gets the dates
function getContactDates()
{
  var todayYear = TODAY.getFullYear();
  var todayNumber = TODAY.getTime();
  // date we want to go back to for previous dates
  var previousNumber = todayNumber + (NUM_ADDITIONAL_DAYS * -1 * ONE_DAY);
  // date we want to go forward to for future dates
  var futureNumber = todayNumber + (NUM_ADDITIONAL_DAYS * ONE_DAY);
  
  // get all contacts
  var allContacts = ContactsApp.getContacts();
  var allContactDates = {};
  var justDates = [];
  
  // go through all contacts
  for(var i = 0, numContacts = allContacts.length; i < numContacts; ++i)
  {
    var oneContact = allContacts[i];
    
	// get contact details
    var contactName = oneContact.getFullName();
    var contactNickName = oneContact.getNickname();
    var contactEMail = oneContact.getPrimaryEmail();
    var contactPhoneNumber = oneContact.getPhones(ContactsApp.Field.MOBILE_PHONE);
    var contactDates = oneContact.getDates();
    
    var contactInformation = [];
    if(contactEMail) contactInformation.push(contactEMail);
    if(contactPhoneNumber.length) contactInformation.push("<a href='tel:" + contactPhoneNumber[0].getPhoneNumber() + "'>" + contactPhoneNumber[0].getPhoneNumber() + "</a>");
    contactInformation = contactInformation.join(", ");
    
	// go through all the dates for this contact
    for(var j = 0, numDates = contactDates.length; j < numDates; ++j)
    {
      var oneDate = contactDates[j];
      var dateLabel = oneDate.getLabel().toString().toLowerCase();
      var dateDate = new Date(todayYear, oneDate.getMonth().ordinal(), oneDate.getDay());
      var dateNumber = dateDate.getTime();
      var age = todayYear - oneDate.getYear();
      
      if(!(dateNumber in allContactDates))
      {
        justDates.push(dateNumber);
        allContactDates[dateNumber] = {"dateDate" : dateDate, "contactDateDetails" : []};
      }
      
      var contactDateDetails = [];
      contactDateDetails.push(contactName + (contactNickName ? " (" + contactNickName + ")" : ""));
      contactDateDetails.push(dateLabel);
      contactDateDetails.push(age + " years");
      if(contactInformation) contactDateDetails.push(contactInformation);
      
      allContactDates[dateNumber]["contactDateDetails"].push(contactDateDetails.join('<br />'));
    }
  }
  
  // sort them
  justDates.sort();
  
  var message = "";
  
  // print today's dates
  if(todayNumber in allContactDates) message += printDateList(allContactDates, [todayNumber]);
  else message += 'No Events Today';
  message += '<hr />';
  
  // print next NUM_ADDITIONAL_DAYS number of future dates
  message += printDateList(allContactDates, justDates.filter(function(dateNumber)
                                                             {
                                                               return dateNumber > todayNumber && dateNumber <= futureNumber;
                                                             }));
  message += '<hr />';
  // print previous NUM_ADDITIONAL_DAYS number of past dates
  message += printDateList(allContactDates, justDates.filter(function(dateNumber)
                                                             {
                                                               return dateNumber < todayNumber && dateNumber >= previousNumber;
                                                             }).reverse());
  message += '<hr />';
  message += '<hr />';
  message += '<hr />';
  
  // print all everything
  message += printDateList(allContactDates, justDates);
  
  // send the email
  MailApp.sendEmail({
    "to" : EMAIL_TO,
    "subject" : "Today's Special Dates - " + TODAY.toISOString().split("T")[0] + " - " + TODAY.toDateString(),
    "htmlBody" : message
  });
}

// prints the dates
function printDateList(contactDates, printList)
{
  var out = "";
  
  for(var i = 0, numDates = printList.length; i < numDates; ++i)
  {
    var oneDate = contactDates[printList[i]];
    var dateDate = oneDate["dateDate"];
    var contactDateDetails = oneDate["contactDateDetails"];
    
    out += dateDifference(TODAY, dateDate) + ' - ' + dateDate.toDateString();
    out += '<ul><li>' + contactDateDetails.join('<br /><br /></li><li>') + '</li></ul>';
  }
  
  return out;
}

// returns a pretty date difference (e.g. Today, Tomorrow, Yesterday, etc...) 
function dateDifference(startDate, endDate)
{
  var numDaysBetween = Math.round((endDate.getTime() - startDate.getTime())/ONE_DAY);
  if(numDaysBetween == 0) return "Today";
  if(numDaysBetween == 1) return "Tomorrow";
  if(numDaysBetween == -1) return "Yesterday";
  if(numDaysBetween == 2) return "Day After Tomorrow";
  if(numDaysBetween == -2) return "Day Before Yesterday";
  if(numDaysBetween > 2) return "in " + numDaysBetween + " days";
  return (numDaysBetween * -1) + " days ago";
}
