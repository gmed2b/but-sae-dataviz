import re

def remove_empty_lines(files) :
    for file_name in files:
        print(file_name)
        with open(file_name) as file:
            # remove empty line from file
            data = file.read()
            data = re.sub(r'\n\s*\n', '\n', data)

        with open(file_name, 'w') as file:
            file.write(data)

def regroup(files):
    files_categories: str = ""
    for file_name in files:
        files_categories += append_new_category(file_name)

    with open("./CSV/all_incendies.csv", 'w') as file:
        file.write(files_categories)

def append_new_category(file_name) :
    new_file: str = ""
    with open(file_name) as file:
        lines = file.readlines()
        new_lines = ""
        for line in lines[1:]:
            new_line = line.split(';')
            new_line[-1] = new_line[-1].replace('\n', '')
            new_line.append("0" + '\n')
            new_lines += ';'.join(new_line)
        new_file += new_lines
    return new_file

# ouvre le fichier global et recupere toutes les lignes
# ouvre le fichier courant et recupere toutes les lignes
# pour chaque ligne du fichier courant
# rechercher la ligne dans le fichier global
# si la ligne existe dans le fichier global, la supprimer
# sinon, ajouter la ligne dans le fichier global
def merge(input_file):
    all_lines: list[str] = []
    new_lines: list[str] = []
    lines_to_append: list[str] = []
    with open('all.csv') as file:
        all_lines = file.readlines()

    with open(input_file) as file:
        lines = file.readlines()
        for line in lines:
            cline = line.split(';')
            tofind = ';'.join(cline[0:-1])
            if tofind in all_lines:
                all_lines.remove(tofind)
            else:
                lines_to_append.append(line)

        for line in all_lines:
            new_line = line.split(';')
            new_line[-1] = new_line[-1].replace('\n', '')
            new_line.append("0" + '\n')
            new_lines.append(';'.join(new_line))
        all_lines = new_lines

    with open('all.csv', 'w') as file:
        file.writelines(all_lines + lines_to_append)

def remove_duplicate(input_file):
    lines_seen = set()
    outfile = open("all2.csv", "w")
    with open(input_file, "r") as file:
        for line in file.readlines()[1:]:
            line = line.split(';')
            line.pop()
            line[-1] = line[-1] + '\n'
            line = ';'.join(line)
            if line not in lines_seen:
                outfile.write(line)
                lines_seen.add(line)
    outfile.close()

def keep_id_and_category(input_file):
    with open(input_file) as file:
        new_lines = []
        lines = file.readlines()
        for line in lines:
            new_line = line.split(';')
            new_lines.append(new_line[1] + ';' + new_line[-1])
        with open(input_file+'.csv', 'w') as file:
            file.writelines(new_lines)

def append_category_to_id(input_file):
    with open('CSV/all_category.csv.csv') as file:
        categories_lines = file.readlines()
        with open(input_file) as file:
            lines = file.readlines()
            for line in lines:
                line = line.split(';')
                for category_line in categories_lines:
                    category_line = category_line.split(';')
                    if line[1] == category_line[0]:
                        line[-1] = line[-1].replace('\n', '')
                        line.append(category_line[1])
                        break
                with open(input_file+'.csv', 'a') as file:
                    file.write(';'.join(line))

append_category_to_id('all.csv')