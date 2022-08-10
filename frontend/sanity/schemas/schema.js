import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import { userSchema } from "./userSchema";
import { transactionSchema } from "./transactionSchema";
import event from "./event";
import blockContent from "./blockContent";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    event,
    userSchema,
    transactionSchema,
    blockContent,
  ]),
});
