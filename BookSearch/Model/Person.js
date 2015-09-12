model.Person = new DataClass("Persons", "public");

model.Person.ID = new Attribute("storage", "long", "key auto");
model.Person.firstName = new Attribute("storage", "string");
model.Person.lastName = new Attribute("storage", "string");
model.Person.address = new Attribute("storage", "string");

model.Person.user = new Attribute("relatedEntities", "Users", "person", {reversePath:true});//will only ever be one
model.Person.bookCollection = new Attribute("relatedEntities", "Books", "owner", {reversePath:true});


