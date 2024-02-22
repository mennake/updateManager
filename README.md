Requirement: We have SN REST web service which is taking an XML file from Workday and populating a table with the content of its nodes. We have a separate LDAP import which is using a transform map to map fields from LDAP import set table to a New Hire table that will be used to trigger a series of tasks for payroll. However LDAP is not capturing the manager field for new hires. I created a business rule that when run will update the New Hire table with the addition manager field from the Workday API, thus allowing two sources to populate our table.

This is related the the API repository.
