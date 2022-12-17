import sys
import csv
name,msg,reply = sys.argv[1],sys.argv[2],sys.argv[3]




send =[ [name,msg,reply]]
	
# name of csv file
filename = "messages.csv"
	
# writing to csv file
with open(filename, 'a') as csvfile:
	# creating a csv dict writer object
	csvwriter = csv.writer(csvfile)
	
		
	# writing data rows
	csvwriter.writerows(send)
