model.Group = new DataClass("Groups", "publicOnServer");

model.Group.ID = new Attribute("storage", "long", "key auto");
model.Group.directoryID = new Attribute("storage", "string");
model.Group.user = new Attribute("relatedEntity", "User", "User");
