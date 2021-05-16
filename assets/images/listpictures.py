from os import listdir;
from os.path import isfile, join;
from os import walk

json = "{\n\t\"root\":\"assets/images/\",";

json += "\t\n\t\"images\":["

dirs = [ "2019-Head-Start", "2019-Trainings", "2019-Cal-Games","2019-Chezy-Champs", "2019-Symposium", "2020-Build-Season", "2020-LAN"]

def changeQuotes( s ):
    n = s.replace( "\'", "\"" );
    return n;

first = True;

for d in dirs :
    f = []
    for (dirpath, dirnames, filenames) in walk(d + '/'):
        f.extend(filenames)
        break
    if( not first ):
        json += ","
    json += "\n\t\t{\n\t\t\t\"dir\":\"" + str(dirpath) + "\",\n\t\t\t\"images\":"+changeQuotes(str(filenames))+"\n\t\t}"
    first = False

json += "\n\t]"
print json + "\n}"

