// 帖子接口返回的数据
export const postsData = [
  {
    post_id: 1,
    selfcontent_id:1,
    content: "这是第一个帖子",
    timestamp: "2024-03-21",
    favorites: 8,
    comments: 15
  },
  
  {
    post_id: 2,
    selfcontent_id:2,
    content: "这是第二个帖子",
    timestamp: "2024-03-22",
    favorites: 8,
    comments: 15
  },

  {
    post_id: 3,
    selfcontent_id:3,
    content: "这是第三个帖子",
    timestamp: "2024-03-23",
    favorites: 8,
    comments: 15
  },
  
  {
    post_id: 4,
    selfcontent_id:4,
    content: "这是第四个帖子",
    timestamp: "2024-03-24",
    favorites: 8,
    comments: 15
  },
  
  {
    post_id: 5,
    selfcontent_id:5,
    content: "这是第五个帖子",
    timestamp: "2024-03-25",
    favorites: 8,
    comments: 15
  },
  
  // 可以添加更多的帖子数据
];

// 回复接口返回的数据
export const repliesData = [
  {
    post_id: 1,
    self_name: "bb",
    reply_name: null,
    selfcontent_id: 6,
    content: "这是第一个帖子的回复",
    timestamp: "2024-03-22"
  },
  {
    post_id: 1,
    self_name: "cc",
    reply_name: "bb",
    selfcontent_id: 7, // Corrected property name
    content: "这是在post1中,cc对bb的回复",
    timestamp: "2024-03-22"
  },

  {
    post_id: 2,
    self_name: "dd",
    reply_name: "ee",
    selfcontent_id: 8, // Corrected property name
    content: "这是在post2中,dd对ee的回复",
    timestamp: "2024-03-23"
  },

  ,

  {
    post_id: 1,
    self_name: "poster",
    reply_name: null,
    selfcontent_id: 9, // Corrected property name
    content: "这是在post1中,poster自己",
    timestamp: "2024-03-23"
  },

  {
    post_id: 2,
    self_name: "ff",
    reply_name: "ee",
    selfcontent_id: 10, // Corrected property name
    content: "这是在post2中,ff对ee的回复",
    timestamp: "2024-03-23"
  },
  
  ,

  {
    post_id: 3,
    self_name: "poster",
    reply_name: "ee",
    selfcontent_id: 11, // Corrected property name
    content: "这是在post3中,poster对ee的回复",
    timestamp: "2024-03-23"
  }


  // 可以添加更多的回复数据
];