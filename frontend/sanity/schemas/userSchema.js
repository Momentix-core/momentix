export const userSchema = {
  name: "users",
  title: "Users",
  type: "document",
  fields: [
    {
      name: "address",
      title: "Wallet Address",
      type: "string",
    },
    {
      name: "userName",
      title: "User Name",
      type: "string",
    },
    {
      title: "Organizer",
      name: "organizer",
      type: "boolean",
      description: "Is this user also an organizer?",
    },
    {
      name: "transactions",
      title: "Transactions",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "transactions" }],
        },
      ],
    },
  ],
};
