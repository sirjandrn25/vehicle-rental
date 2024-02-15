import { Schema } from "mongoose";

export { Schema as DbSchema };

export const DbSchemaCore = (schema: any) => {
  schema.pre("save", function (this: any, next: any) {
    if (this._id) {
      this.id = this._id.toString();
      delete this._id;
    }
    next();
  });

  // Define a pre-find hook to convert _id to string and remove the original _id field
  schema.pre("find", function (this: any) {
    if (this._conditions._id) {
      this._conditions.id = this._conditions._id.toString();
      delete this._conditions._id;
    }
  });

  // Define a pre-findOne hook to convert _id to string and remove the original _id field
  schema.pre("findOne", function (this: any) {
    if (this._conditions._id) {
      this._conditions.id = this._conditions._id.toString();
      delete this._conditions._id;
    }
  });
  schema.post("save", function (this: any, next: any) {
    this._id = this._id.toString();
    console.log("this._id", this._id);
    next();
  });
};
