# nGCDE
Google Contact Dates E-Mail (nGCDE) is Google App Script that sends an e-mail of all dates, like birthdays and anniversaries, in your Google Contacts.

# About

I wanted to get an e-mail every day of important dates, like upcoming birthdays or anniversaries. So I wrote this Google Apps script. It will generate an e-mail of all the dates in your Google Contacts and send it to you.

# To Use

1. Create a new Google Apps script
2. Copy and paste the content of nGCDE.js from this GitHub repo
3. Change the value of `EMAIL_TO` (line 6)
4. Create a trigger to run whenever you want

# Example E-mail

The end result is something like this:

	Today - Fri Nov 30 2018
	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	---

	in 7 days - Fri Dec 07 2018
	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	---

	in 8 days - Sat Dec 08 2018
	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	---

	Day Before Yesterday - Wed Nov 28 2018
	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	---

	5 days ago - Sun Nov 25 2018
	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	---
	---
	---

	333 days ago - Mon Jan 01 2018
	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	100 days ago - Mon Jan 01 2018
	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

	in 10 days - Mon Jan 01 2018
	 - name
	   birthday
	   age
	   user@email.com, 123-456-7890

