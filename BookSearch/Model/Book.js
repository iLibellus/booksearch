model.Book = new DataClass("Books", "public");

model.Book.ID = new Attribute("storage", "long", "key auto");
model.Book.title = new Attribute("storage", "string");
model.Book.author = new Attribute("storage", "string");
model.Book.ISBN = new Attribute("storage", "string");
model.Book.price = new Attribute("storage", "number");

model.Book.owner = new Attribute("relatedEntity", "Person", "Person");
model.Book.bookDetail = new Attribute("relatedEntities", "BookDetails", "bookDetail", {reversePath:true});


model.Book.entityMethods.getBooks = function(searchString) {
	var books = ds.Book.find("title == :1", searchString);
	return books;
}

model.Book.entityMethods.getBooks.scope = "public";
