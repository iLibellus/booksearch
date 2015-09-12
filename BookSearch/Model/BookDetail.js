model.BookDetail = new DataClass("BookDetails", "public");

model.BookDetail.ID = new Attribute("storage", "long", "key auto");
model.BookDetail.info = new Attribute("storage", "string");
model.BookDetail.image = new Attribute("storage", "image");

model.BookDetail.bookDetail = new Attribute("relatedEntity", "Book", "Book");
