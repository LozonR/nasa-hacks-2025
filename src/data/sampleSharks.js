function modulo(a, b) {
  return a - Math.floor(a/b) * b;
}

function random(t) {
  if (t == 0) {
    return 0.5
  } else {
    return modulo(Math.sin(t * 3229.3) * 43758.5453, 1)
  }
}

function Name_of_Sharks(id) {
  const fName = ["Alexandra", "Jaxen", "Zora", "Finnegan", "Lennox", "Dariel", "Fiona", "Kingston", "Brianna", "Braylen", "Aviana", "Christopher", "Aubrie", "Harvey", "Roselyn", "Harvey", "Florence", "Lennox", "Isabelle", "River", "Makenzie", "Gregory", "Charlotte", "Elias", "Shiloh", "Saul", "Isla", "Grady", "Alana", "Kash", "Rivka", "Jedidiah", "Everlee", "Arian", "Rhea", "Anderson", "Pearl", "Solomon", "Raven", "Ronald", "Holly", "Theodore", "Angelina", "Dayton", "Aurora", "Kasen", "Liliana", "Philip", "Georgia", "Coen", "Evelynn", "Marlon", "Nylah", "Nash", "Armani", "Hendrix", "Aspen", "Wilder", "Teresa", "Zain", "Amber", "Koda", "Saylor", "Huxley", "Khloe", "Maximilian", "Lorelei", "Blaine", "Etta", "Caden", "Jenesis", "Jaxon", "Julia", "Ricky", "Madelynn", "Lance", "Bailee", "Enoch", "Kassidy", "Bjorn", "Charli", "Abel", "Wynter", "Gabriel", "Demi", "Eric", "Murphy", "Cedric", "Alessia", "Axl", "Navy", "Krew", "Charlie", "Bryant", "Belen", "Troy", "Dylan", "Neil", "Cali", "Kenneth", "Alanna", "Kieran", "Lillian", "Brooks", "Genevieve", "Onyx", "Joyce", "Deandre", "Virginia", "Duncan", "Deborah", "Layne", "Aliyah", "Avi", "Jayleen", "Kade", "Hadleigh", "Lachlan", "Kamari", "Roland", "Vera", "Brendan", "Alice", "Asher", "Abigail", "Nikolai", "Freyja", "Caspian", "Theodora",
    "Tomas", "Jayda", "Lawson", "Nyla", "Zion", "Alma", "Leif", "Amelia", "Nicolas", "Gemma", "Ocean", "Ruby", "Bellamy", "Landry", "Tyson", "Noor", "Jamison", "Raina", "Luca", "Kairi", "Jaziel", "Sasha", "Tadeo", "Raelynn", "Xander", "Mya", "Jude", "Adrianna", "Uriah", "Harmony", "Rex", "Rayne", "Byron", "Remi", "Ryan", "Martha", "Bode", "Mina", "Dash", "Oakleigh", "Caiden", "Katherine", "Avery", "Chandler", "Huxley", "Aurelia", "Caspian", "Lilian", "Enrique", "Lillie", "Soren", "Rylie", "Jaxxon", "Alma", "Elian", "Ellen", "Yehuda", "Esmeralda", "Kashton", "Cali", "Musa", "Julianna", "Walter", "Hailey", "Reginald", "Kayleigh", "Mathew", "Cassidy", "Leonel", "Zoya", "Frederick", "Camille", "Alden", "Rhea", "John", "Addilyn", "Case", "Demi", "Quentin", "Nova", "Apollo", "Marley", "Tatum", "Ella", "Trey", "Carolina", "August", "Angela", "Sawyer", "Aubriella", "Phoenix", "Alessia", "Marcelo", "Raegan", "Koda", "Nellie", "David", "Ximena", "Dominik", "Sarai", "Luis", "Keyla", "Jonah", "Valerie", "Luis", "Alora", "Phoenix", "Joyce", "Kingston", "Lennox", "Bryce", "Ensley", "Clark", "Braylee", "Bridger", "Celine", "Blaine", "Zahra", "Soren", "Emily", "Hayden", "Heaven", "Colin", "Liliana",
    "Leonidas", "Leia", "Stefan", "Elise", "Oakley", "Paislee", "Kellan", "Zaniyah", "Beckett", "Josie", "Murphy", "Jazmine", "Ryker", "Lyla", "Alvaro", "Marley", "Maximilian", "Crystal", "Hamza", "Chana", "Walker", "Jasmine", "Keegan", "Chloe", "Solomon", "Opal", "Kristopher", "Lilian", "Kyng", "Berkley", "Corbin", "Rivka", "Graysen", "Chaya", "Archer", "Jimena", "Emory", "Ailani", "Kalel", "Alayna", "Seth", "Veda", "Kody", "Sofia", "Marcelo", "Iliana", "Kiaan", "Emerald", "Lucca", "Nia", "Izaiah", "Frankie", "Warren", "Sloan", "Jamison", "Allie", "Miller", "Ashlynn", "Keenan", "Etta", "Kannon", "Rayne", "Shiloh", "Norah", "Niko", "Abby", "Huxley", "Nicole", "Lucas", "Rosalie", "Santiago", "Nola", "Austin", "Ruth", "Wes", "Sunny", "Moses", "Yareli", "Dawson", "Fatima", "Brayan", "Lila", "Ryan", "Poppy", "Aarav", "Jaliyah", "Josue", "Nathalia", "Salvatore", "Mia", "Karter", "Palmer", "Chase", "Yara", "Mason", "Kendra", "Lucca", "Araceli", "Damian", "Sarah", "Daniel", "Alexis", "Thaddeus", "Karter", "Brooks", "Joanna", "Messiah", "Lily", "Finnley", "Payton", "Adrian", "Miracle", "Legend", "Paola", "Bridger", "Marilyn", "Jonathan",
    "Hadley", "Kyrie", "Avianna", "Desmond", "Alina", "Dallas", "Joanna", "Victor", "Miracle", "Zayd", "Renata", "Gustavo", "Sydney", "Cedric", "Camryn", "Ismael", "Lila", "Ian", "Nevaeh", "Kenzo", "Amaris", "Koa", "Collins", "Leo", "Miracle", "Kaysen", "Angelica", "Cory", "Autumn", "Luke", "Jayleen", "Ryder", "Aylin", "Jason", "Madeleine", "Alden", "Anne", "Sage", "Robin", "Hayes", "Elisa", "Titan", "Charlee", "Turner", "Julissa", "Kase", "Annabella", "Bishop", "Araceli", "Knox", "Ila", "Easton", "Natalie", "Camilo", "Ariah", "Daxton", "Grace", "Jason", "Mavis", "Zain", "Lola", "Rhett", "Kate", "Isaiah", "Payton", "Owen", "Chloe", "Tatum", "Juniper", "Vance", "Luella", "Johnny", "Liliana", "Braden", "Aubrielle", "Alvaro", "Savannah", "Sam", "Paris", "Fabian", "Egypt", "Samuel", "Mazikee", "Jedidiah", "Kensley", "Bear", "Nevaeh", "Karter", "Isabelle", "Maximo", "Capri", "Daxton", "Madelyn", "Sam", "Rylan", "Carl", "Charli", "Fletcher", "Grace", "Vincenzo", "Maeve", "Camden", "Emily", "Clark", "Anahi", "Dante", "Anna", "Raylan", "Emelia", "Byron", "Jolene", "Julien", "Aaliyah", "Gary", "Dulce", "Maxton", "Journi", "Foster", "Marleigh", "Adler", "Louisa", "Ford", "Martha", "Kaison", "Quinn", "Kaison", "Belen", "Trent", "Lilah", "Alistair", "Elodie", "River", "Sloane", "Walker", "Mallory", "Cason", "Rayna", "Robin", "Vienna", "Hudson", "Kimber", "Ambrose", "Julia", "Pedro", "Jaylee", "Rodney", "Leanna", "Alvin", "Zelda", "Angel", "Stevie", "Dylan", "Kaisley", "Nicolas", "Leila", "Noel", "Sloane", "Jameson", "Margo", "Misael", "Kenia", "Leif", "Milena", "Tyson", "Margo", "Jaxen", "Paulina", "Theodore", "Chelsea", "Kannon", "Emmalynn", "Damien", "Ellis", "John", "Lorelai", "Harris", "Belle", "Sean", "Teagan", "Hendrix", "Zaniyah", "Kamdyn", "Eileen", "Derek", "Ana", "Jaxxon", "Edith", "Nova", "Fallon", "Rayden", "Chanel", "Ben", "Khloe", "George", "Florence", "Roland", "Laura", "Rhett", "Jazmine", "Stefan", "Aniya", "Ricky", "Kamilah", "Zayn", "Rayna", "Joseph", "Melody", "Gatlin", "Kyla", "Mohammed", "Amina",
    "Cesar", "Clarissa", "Kane", "Aubree", "Ambrose", "Lea", "Quinton", "June", "Abdiel", "Barbara", "Devon", "Anne", "Kristopher", "Beatrice", "Justice", "Lennox", "Leonel", "Halo", "Jedidiah", "Journey", "Valentino", "Michaela", "Izaiah", "Lyra", "Moshe", "Reina", "Jefferson", "Savanna", "Allan", "Morgan", "Branson", "Persephone", "Atreus", "Frida", "Lucas", "Ryleigh", "Zev", "Beatrice", "Brayan", "Sevyn", "Jaxtyn", "Kallie", "Creed", "Danielle", "Isaiah", "Paige", "Josiah", "Liberty", "Daniel", "Emilia", "Rowan", "Skyler", "Levi", "Haisley", "Israel", "Karter", "Blaine", "Gia", "Cassius", "Avalynn", "Lennon", "Cassandra", "Cedric", "Paris", "James", "Sierra", "Azrael", "Brittany", "Creed", "Mckinley", "Jared", "Nala", "Malachi", "Loretta", "Cayden", "Maxine", "Zane", "Persephone", "Jose", "Jaliyah", "John", "Etta", "Kohen", "Luna", "Rayan", "Danielle", "Branson", "Skye", "Maison", "Leona", "Arlo", "Emily", "Cooper", "Shelby", "Zayden", "Paislee", "Leo", "Elisabeth", "Easton", "Remington", "Joziah", "Isabelle", "Osiris", "Alexandra", "Cannon", "Adeline", "Zyair", "Dahlia", "Joey", "Nova", "Eli", "Marie", "Jeremy", "Ila", "Mathew", "Opal", "Oscar", "Isabela", "Aidan", "Everleigh", "Trevor", "Madelyn", "Damian", "Callie", "Hassan", "Adrianna", "Emery", "Olive", "Layton", "Lilian", "Rex", "Clarissa", "Rhys", "Camila", "Quincy", "Dylan", "Knox", "Ailani", "Kody", "Violet", "Johnny", "Dylan", "Rayden", "Fatima", "Beckham", "Renata", "Dillon", "Mina", "Rayan", "Miley", "Dillon",
    "Jocelyn", "Jordan", "Tatum", "David", "Heidi", "Mario", "Sophie", "Ares", "Mikaela", "Kash", "Lila", "Lian", "Nicole", "Rex", "Rhea", "Lucca", "Paola", "Ridge", "Raelynn", "Salem", "Indie", "Reese", "Jade", "Caleb", "Jayla", "Aryan", "Elyse", "Russell", "Kinley", "Victor", "Dani", "Xzavier", "Demi", "Lyric", "Elsa", "Khalid", "Aarya", "Chandler", "Aspyn", "Darren", "Elle", "Jakob", "Samantha", "Troy", "Malaysia", "Finn", "Sky", "Dakota", "Esme", "Cyrus", "Jolene", "Darian", "Kendall", "Cody", "Erin", "Junior", "Avianna", "Layton", "Francesca", "Callen", "Claire", "Isaias", "Lorelai", "Clyde", "Skylar", "Felipe", "Lainey", "Kaysen", "Harley", "Terrance", "Magnolia", "Eliel", "Lexi", "Josue", "Violeta", "Colson", "Angelina", "Benson", "Zoey", "Erik", "Skylar", "Joshua", "Leighton", "Charles", "Lilly", "Elisha", "Kinsley", "Kolton", "Marie", "Gerardo", "Rebecca", "Bear", "Vera", "Nathan", "Adalyn", "Tyson", "Aviana", "Leonardo", "Aliana", "Troy", "Ophelia", "Zaire", "August", "Kristopher", "Zaria", "Dario", "Jane", "Ridge", "Maren", "Arlo", "Lennon", "Genesis", "Addilynn", "Kade", "Emmie", "Kabir", "Ellison", "Lance", "Zara", "Jonathan", "Bristol", "Raul", "Rosie", "Tristen", "Amelie", "Bellamy", "Aurelia", "Briggs", "Skyla", "Landry", "Makenna", "Noel", "Mackenzie", "Mylo", "Emma", "Uriel", "Indie", "Judson", "Daniela", "Hunter", "Nola", "Emanuel", "Adaline", "Ahmed", "Ella", "Remy", "Dalary", "Rayan", "Lilith", "Marshall", "Eliza", "Ridge", "Gracelynn", "Orlando", "Jolene", "Shiloh", "Selah", "Baker", "Estrella", "Maximilian", "Hannah", "Wes", "Catalina", "Ira", "Kaydence", "Kade", "Brielle", "Chance", "Stormi", "Jericho", "Ramona", "Patrick", "Aurelia", "Bowen", "Aubrey", "Brett", "Ariella", "Pablo", "Marina", "Kasen", "Hallie", "Maximilian", "Stormi",
    "Archer", "Janiyah", "Kyler", "Ainhoa", "Gunner", "Braelynn", "Ariel", "Cara", "Ayaan", "Aubrielle", "Wyatt", "Lily", "Remi", "Collins", "River", "Brianna", "Hayes", "Magnolia", "Zyaire", "Arya", "Steven", "Laila", "Roland", "Alexis", "Osiris", "Shelby", "Cameron", "Ruth", "Lance", "Naomi", "Heath", "Julie", "Khari", "Frida", "Troy", "Kai", "Jedidiah", "Vienna", "Marcellus", "Emily", "Mekhi", "Charlie", "Remington", "Adelaide", "Ashton", "Deborah", "Cristian", "Alana", "Jaylen", "Esperanza", "Isaiah", "Kai", "Paxton", "Parker", "Kellan", "Emmeline", "Moses", "Kamiyah", "Kairo", "Sawyer", "Edwin", "Rowan", "Elliot", "Rylie", "Legend", "Angela", "Atlas", "Selena", "Crew", "Delaney", "Kase", "Jessie", "Logan", "Braelynn", "Enzo", "Anais", "Raphael", "Braelynn", "Ari", "Emilia", "Carmelo", "Estella", "Bryant", "Quinn", "Finley"];
  const lName = ["Terrell", "Ventura", "Robbins", "Weiss", "Davenport", "Bowman", "Alexander", "Kennedy", "Frank", "Cobb", "Campbell", "Woodard", "Francis", "Montes", "Francis", "Cordova", "Little", "Reynolds", "Herrera", "Shelton", "Christensen", "Brown", "Evans", "Goodwin", "Flowers", "Baker", "Daniel", "Santos", "Carr", "Chung", "Rosario", "Bush", "Medrano", "Bradford", "Newman", "Meadows", "Barber", "Cardenas", "Shepherd", "Hammond", "Thompson", "Yang", "Sierra", "Scott", "Saunders", "Barnes", "Goodman", "Boyd", "Avalos", "Caldwell", "Jarvis", "Cummings", "Watkins", "Camacho", "Welch", "Hoffman", "Rosales", "Guevara", "Shah", "Salas", "Greer", "Mejia", "Villanueva", "Hunter", "Waters", "Patton", "Gould", "Dodson", "Nunez", "Bean", "Mitchell", "Coleman", "Beltran", "Farmer", "Murillo", "Giles", "Dorsey", "Farrell", "McKee", "O'Connor", "Warren", "Warner", "Nguyen", "Leonard", "Kelley", "Leal", "Leal", "Glover", "Strong", "Yu", "Humphrey", "Griffin", "Yu", "McMahon", "Blair", "Person", "Hurst", "Banks", "Wheeler", "Shaffer", "Bauer", "Rivera", "Price", "Hunt", "Rocha", "McCann", "Winters", "Hoover", "Lu", "Nixon", "Hensley", "Nichols", "Blevins", "Drake", "Barker", "Dudley", "McDowell", "Krueger", "Morton",
    "Burke", "Hobbs", "Ramos", "Young", "Gonzalez", "Villarreal", "Burch", "Roach", "Buckley", "Baxter", "Wall", "Becker", "Santiago", "Woods", "Cochran", "Haley", "Garcia", "Pierce", "Hart", "Sloan", "Kelly", "Henson", "Pugh", "Bush", "Shepard", "Farmer", "Ellison", "Gutierrez", "Morse", "Hoover", "Roberson", "Ware", "Russell", "Daniels", "Nunez", "Guzman", "Davenport", "Bruce", "Robertson", "Hancock", "Davila", "Berger", "West", "Cruz", "Leach", "Morse", "Atkins", "Hendricks", "McMillan", "Lara", "Stevens", "Duncan", "Proctor", "Villanueva", "Pope", "Roach", "Dalton", "Buchanan", "Mata", "Suarez", "Steele", "Lowery", "Cochran", "Steele", "Sexton", "House", "Baldwin", "Doyle", "Banks", "Solomon", "Dean", "Wong", "Watson", "Reyna", "McGee", "Wiley", "Barber", "Shelton", "Villalobos", "Wise", "Oliver", "Cisneros", "Bradford", "Clark", "Sherman", "Briggs", "Leonard", "Zamora", "Nguyen", "Trujillo", "Cunningham", "Camacho", "Anderson", "Pitts", "Goodman", "Burns", "Franklin", "Jordan", "Michael", "Estrada", "Glover", "Roy", "Dominguez", "Greer", "Enriquez", "Ramirez", "Herrera", "Booker", "Zhang", "Ford", "Quintero", "Bryant", "Washington", "Ford", "Carey", "Estrada", "McCann", "Alexander", "Weiss", "Guerrero", "Underwood", "Reeves", "Espinosa", "Esquivel", "Delacruz", "Gould", "Bass", "Suarez", "Moore", "Rose", "Quinn", "Rojas", "Barnes", "Fischer", "Walsh", "Nava", "Duncan", "Calderon", "Mann", "Arellano", "Mosley", "Knight", "Aguilar", "Schmitt", "Kent", "Vargas", "Alexander", "Reilly", "Cunningham", "Waters", "Peck", "Phelps", "Stout", "Santos", "Harrison", "Strickland", "Clark", "Barber", "Dickerson", "Stark", "Dalton",
    "Duffy", "Bradshaw", "Jennings", "Chung", "Farley", "Boyer", "Hunter", "Suarez", "Bradshaw", "Pratt", "Duke", "Larson", "Manning", "Sheppard", "Coffey", "Taylor", "Roy", "Dunlap", "McCall", "Sanford", "Potter", "Strickland", "Schroeder", "Summers", "Sutton", "Mathews", "Farmer", "Serrano", "Rich", "Acevedo", "Branch", "Dodson", "Flynn", "Davila", "Anthony", "Freeman", "Holt", "Ball", "Villanueva", "Harvey", "Davis", "Kelley", "Peterson", "Pineda", "Ruiz", "Ray", "Rollins", "Rich", "Person", "Pennington", "Dunn", "Fleming", "Donovan", "Matthews", "Cruz", "Hines", "Vincent", "Velazquez", "Reid", "Good", "Galindo", "Davis", "Gordon", "Jennings", "Wallace", "Sweeney", "Hernandez", "Cain", "Potter", "Rollins", "Barnes", "Gray", "Wilson", "Curtis", "Palacios", "Moses", "Price", "O’brien", "Stephens", "Wright", "Huff", "Andrews", "Edwards", "Solis", "Hayes", "Coffey", "Esquivel", "Bruce", "Cooper", "Gonzales", "Perkins", "Love", "Benson", "Hicks", "Espinoza", "O’brien", "Hawkins", "Solis", "Whitehead", "Orozco", "Mathis", "Wheeler", "Leal", "Sharp", "Duran", "Matthews", "Chavez", "Chavez", "Ballard", "Magana", "Weiss", "Benson", "Scott", "Solis", "Lamb", "Shah", "Nixon", "Brooks", "Walker", "Drake", "Butler", "Cervantes", "Hamilton", "Fuentes", "Cisneros", "Mathis", "Garner", "Costa", "Harper", "Bowers", "Rubio", "Reid", "Daugherty", "Dejesus", "Frederick", "Fitzpatrick", "Novak", "Rollins", "Chapman", "Lucero", "Reed", "Gomez", "Everett", "Aguirre", "Park", "Ramirez", "Hamilton", "Schaefer", "Shah", "Watkins", "Porter", "Liu", "Gomez", "Andrews", "Perez", "Clark", "Camacho", "Palmer", "Proctor", "Reyna", "Erickson", "Barnes", "Leblanc", "Bartlett", "Reilly", "Gutierrez", "Wyatt", "Pacheco", "Cross", "Cano", "Harris", "Travis", "Rosario", "Webster", "Rivers", "Chavez", "Gordon", "Reynolds", "Nolan", "Wiggins", "Park",
    "Rogers", "Wyatt", "Hurley", "Esparza", "O’Connor", "Dalton", "Ramirez", "Preston", "Wagner", "Dixon", "Moore", "Reeves", "Christian", "Davidson", "Ortiz", "Jefferson", "Adkins", "Berger", "Wolf", "Meyers", "Cook", "Calhoun", "Huerta", "Dickson", "Humphrey", "McPherson", "McClain", "Blanchard", "Rosario", "Montoya", "Leach", "Goodwin", "James", "Goodwin", "McMahon", "Sheppard", "Ortega", "Andersen", "Brennan", "Herrera", "Warren", "Santos", "Morton", "Atkins", "McDowell", "Boyle", "Nielsen", "Adams", "Callahan", "Livingston", "Coleman", "Liu", "Esquivel", "Felix", "McKay", "Dillon", "Ali", "Ramos", "Robbins", "Nelson", "Merritt", "Pierce", "Peters", "Paul", "Warren", "Ward", "Strong", "Middleton", "Quintana", "Haley", "Livingston", "Bush", "Strong", "Terrell", "Herman", "Thompson", "Allison", "Flynn", "Dickson", "Le", "Kirk", "Clark", "French", "Cantrell", "Tang", "Powers", "Weaver", "Welch", "Mosley", "Vu", "Ware", "Douglas", "Harper", "Lowery", "Guerra", "Moon", "Hahn", "Mosley", "Gilmore", "Bullock", "Hunter", "Medina", "Cordova", "Morton", "Becker", "Porter", "Kent", "Nava", "Harding", "Beltran", "Stark", "Cortez", "McDowell", "Sanchez", "Bell", "Pruitt", "Maxwell", "Bridges", "Miranda", "Graves", "Fry", "Neal", "Crawford", "Livingston", "Cortes", "Callahan", "Mills", "Andrade", "Bernard", "Shields", "Mathis", "Stark", "Barrera", "Benitez", "Weiss", "Shelton", "McCarty", "Rosario", "Luna", "Pittman", "Tapia", "Schroeder", "Patrick", "Macias", "Greer", "Sawyer", "Roy", "Glass", "Ryan", "Ventura", "Howe", "Dyer", "Blackburn", "Davis", "Porter", "Horne", "Barrera", "Donovan", "Kline", "Bryan", "Knox", "Stein", "Trujillo", "Gomez", "Li", "Roberts", "Wyatt", "Wilson", "Flores", "Vasquez", "Malone", "Moore", "Thornton", "Rios", "Moses", "Gould", "Beck",
    "Barton", "Salgado", "Melton", "Sosa", "Leal", "Pacheco", "Garcia", "Zamora", "Xiong", "Estes", "Stein", "Mercado", "Miles", "Pitts", "Olson", "Brandt", "Harvey", "Vance", "Lynch", "Howe", "Sanders", "Velazquez", "Clark", "Dodson", "Abbott", "Wilson", "Cameron", "Trujillo", "Ventura", "Tate", "Phan", "Hampton", "Ray", "Moore", "Kelly", "Osborne", "Schmidt", "Mann", "Scott", "Jarvis", "Reed", "Barker", "Johns", "Reynolds", "Delarosa", "Ford", "Owen", "Jimenez", "Stanton", "McDaniel", "McKay", "Nguyen", "Reyes", "Pittman", "Carpenter", "Lucero", "Wiley", "Dickerson", "Carroll", "Spears", "Vega", "Sanders", "Bowen", "Rogers", "Barnes", "Snyder", "Hardin", "Davenport", "Barry", "Dunn", "Huynh", "Dalton", "Hancock", "Fry", "Quinn", "Hernandez", "Poole", "Person", "Chapman", "Pratt", "Coffey", "Torres", "Erickson", "Person", "Mosley", "Fleming", "Santiago", "Orozco", "Zavala", "Atkins", "Cameron", "Eaton", "Zavala", "Gilbert", "Brooks", "Rhodes", "Ramirez", "Lara", "Lambert", "Howard", "Carson", "Murillo", "Carr", "Matthews", "O’Donnell", "Harvey", "Hancock", "Bradford", "Potter", "Coffey", "Skinner", "Russell", "Hull", "Preston", "McClure", "Long", "Parker", "Davidson", "Buckley", "Keith", "Pham", "Rosales", "Hawkins", "Hendricks", "Alfaro", "Leonard", "Maddox", "Phan", "Espinosa", "Mayo", "Nash", "Friedman", "Montes", "Graves", "McMahon", "Hughes", "Blair", "Singleton", "Stone", "McLean", "Watts", "Velasquez", "Lyons", "Wolf", "Corona", "Barrett", "Schultz", "Escobar", "English", "Love", "Huynh", "Huang", "Norton", "Cruz", "Zhang", "French", "Villegas", "Morales", "Lucero", "Hail", "Lamb", "Little", "Church", "Rose",
    "Shannon", "Haynes", "Reid", "Gould", "Walters", "Yang", "Cain", "Young", "Pacheco", "Morales", "Turner", "Higgins", "Rivera", "Carpenter", "Enriquez", "Collins", "Burgess", "Pittman", "Pineda", "Morrison", "Rivers", "Burke", "Diaz", "Marshall", "Bush", "Cobb", "Bennett", "Clay", "Blair", "Chang", "Lloyd", "Valentine", "Stark", "Small", "Frost", "Jensen", "Skinner", "Harmon", "Ray", "Fowler", "Bravo", "Haley", "Barker", "Rocha", "Hahn", "Potts", "Murillo", "Carroll", "Cooper", "Waters", "Bautista", "Hubbard", "Crosby", "Gentry", "Henson", "Pope", "Curry", "Kirby", "Maynard", "Lin", "Paul", "Hamilton", "Sexton", "Johnson", "Hines", "Preston", "Pugh", "Contreras", "Morgan", "Pineda", "Dennis", "Rojas", "Richard", "Anderson", "Vaughn", "Parra", "Cameron", "Figueroa", "Leon", "Romero", "Skinner", "Joseph", "Conway", "Wolf", "Anthony", "Rodgers", "Hartman", "Dyer", "Waters", "Hill", "Rollins", "Stone", "Chung", "Beltran", "Barker", "Foster", "Lucas", "Stuart", "Mayo", "Esparza", "Peters", "Pope", "Fuentes", "Parker", "Dougherty", "Webb", "Page", "Sawyer", "Saunders", "Wolfe", "Waters", "Stuart", "Hunter", "Wilkerson", "Valdez", "Mayer", "Pearson", "Newton", "Beil", "Clements", "Huang", "Bartlett", "Lewis", "Wright", "Rosas", "Benson", "Herrera", "Kennedy", "Harper", "Rose", "Blake", "Fisher", "Hoffman", "Johnston", "Morton", "Curtis", "Delarosa", "Osborne", "Murphy", "Ray", "Murillo", "Phillips", "McCann", "Cameron", "Choi", "Blackburn", "Blair", "McCall", "Rosario", "Nielsen", "Blackwell", "Moore", "Kent", "Griffin", "Willis", "Wong", "Murray", "Nixon", "Byrd", "Santos", "Avila", "Rasmussen", "Gomez",
    "McCall", "Bishop", "Bryant", "Arellano", "Bernal", "Person", "Melton", "Garrett", "Estrada", "Schwartz", "Carr", "Shaw", "Steele", "Hayes", "Franklin", "Nichols", "Greene", "Weber", "Schneider", "Frederick", "Villegas", "Thomas", "Newton", "Wagner", "Benton", "Cobb", "Newton", "Chang", "Flores", "Wilkerson", "McClure", "Yu", "James", "May", "Galvan"];
  const fNameRandom = fName[Math.floor(random(id*5.2) * fName.length)];
  const lNameRandom = lName[Math.floor(random(id*1.4) * lName.length)];

  return fNameRandom + " " + lNameRandom;
}

// console.log(Name_of_Sharks());


export const sampleSharks = [
  {
    id: 1,
    name: "Jaws Jr.",
    species: "Great White Shark",
    tagId: "GWS-2024-001",
    lat: 36.7783,
    lng: -121.9200,
    lastUpdate: "2025-10-02 14:32 UTC",
    sst: 18.5,
    chlorophyll: 0.8,
    depth: 45,
    foragingProb: 78,
    foragingRadius: 50,
    recentPrey: [
      { species: "Sea Lion", time: "2h ago" },
      { species: "Tuna", time: "5h ago" }
    ]
  },
  {
    id: 2,
    name: "Hammerhead Sally",
    species: "Scalloped Hammerhead",
    tagId: "SHH-2024-012",
    lat: 21.3099,
    lng: -157.8581,
    lastUpdate: "2025-10-02 13:15 UTC",
    sst: 24.2,
    chlorophyll: 0.3,
    depth: 120,
    foragingProb: 65,
    foragingRadius: 35,
    recentPrey: [
      { species: "Squid", time: "1h ago" },
      { species: "Mackerel", time: "4h ago" }
    ]
  },
  {
    id: 3,
    name: "Tiger Tom",
    species: "Tiger Shark",
    tagId: "TGS-2024-007",
    lat: -23.5505,
    lng: -46.6333,
    lastUpdate: "2025-10-02 15:48 UTC",
    sst: 22.1,
    chlorophyll: 1.2,
    depth: 25,
    foragingProb: 92,
    foragingRadius: 60,
    recentPrey: [
      { species: "Sea Turtle", time: "30m ago" },
      { species: "Stingray", time: "3h ago" },
      { species: "Fish School", time: "6h ago" }
    ]
  },
  {
    id: 4,
    name: "Blue Lightning",
    species: "Blue Shark",
    tagId: "BLS-2024-019",
    lat: 40.7128,
    lng: -40.0060,
    lastUpdate: "2025-10-02 12:22 UTC",
    sst: 16.8,
    chlorophyll: 0.5,
    depth: 200,
    foragingProb: 55,
    foragingRadius: 45,
    recentPrey: [
      { species: "Herring", time: "7h ago" }
    ]
  }
]


for (let i = 0; i < sampleSharks.length; i++) {
  sampleSharks[i].name = "" + Name_of_Sharks(sampleSharks[i].id);
}