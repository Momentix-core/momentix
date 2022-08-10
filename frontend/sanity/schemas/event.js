export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "summary",
      title: "Summary",
      type: "string",
      description: "Short event summary. No more than 140 characters.",
      validation: (Rule) =>
        Rule.max(140).warning(
          `The summary should cannot exceed 140 characters.`
        ),
    },
    {
      name: "description",
      title: "Description",
      type: "blockContent",
    },
    {
      name: "startTime",
      title: "Start Time",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MMM-DD",
        timeFormat: "h:mm a",
        timeStep: 15,
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "endTime",
      title: "End Time",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MMM-DD",
        timeFormat: "h:mm a",
        timeStep: 15,
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "transferDate",
      title: "Allow Resell Start Date",
      type: "datetime",
      options: {
        dateFormat: "YYYY-MMM-DD",
        timeFormat: "h:mm a",
        timeStep: 15,
        calendarTodayLabel: "Today",
      },
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "link",
      title: "Event Url",
      type: "url",
    },
    {
      name: "users",
      title: "Users",
      type: "reference",
      to: { type: "users" },
    },
    {
      name: "mainImage",
      title: "Event Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
  ],
};
