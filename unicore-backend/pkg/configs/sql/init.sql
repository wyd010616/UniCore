-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
     `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'PK',
     `user_name` varchar(255) NOT NULL COMMENT '用户名',
     `password` varchar(255) NOT NULL COMMENT '用户密码',
     `email` varchar(255) NOT NULL COMMENT '用户邮箱',
     `school` int COMMENT '学校',
     `avatar` varchar(255) COMMENT '用户头像',
     `created_at` timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'User information create time',
     `updated_at` timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'User information update time',
     `deleted_at` timestamp    NULL DEFAULT NULL COMMENT 'User information delete time',
     PRIMARY KEY (`id`),
     KEY `email_idx` (`email`) USING BTREE,
     KEY `email_password_idx` (`email`,`password`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
    `id`  bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'PK',
    `creator_id` varchar(255) NOT NULL COMMENT '发布者ID',
    `content` TEXT NOT NULL COMMENT '内容',
    `create_time` varchar(255) COMMENT '创建时间',
    `nick_name` varchar(255) NOT NULL COMMENT '匿名昵称',
    `school` int NOT NULL COMMENT '学校',
    `type` int NOT NULL COMMENT '类型，校内还是公开',
    `reply_to` bigint COMMENT '如果是回复的话，回复的那一个内容的id',
    `parent_id` bigint COMMENT '如果是回复的话，父post的id',
    `created_at` timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'User information create time',
    `updated_at` timestamp    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'User information update time',
    `deleted_at` timestamp NULL DEFAULT NULL COMMENT 'User information delete time',
    PRIMARY KEY (`id`),
    KEY `creator_idx` (`creator_id`) USING BTREE,
    KEY `parent_idx` (`parent_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2000 DEFAULT CHARSET=utf8 COMMENT='帖子&回复表';

-- ----------------------------
-- Table structure for like
-- ----------------------------
DROP TABLE IF EXISTS `like`;
CREATE TABLE `like` (
    `like_id` bigint NOT NULL AUTO_INCREMENT COMMENT '赞ID',
    `post_id` bigint NOT NULL COMMENT '帖子ID',
    `from_user_id` bigint NOT NULL COMMENT '点赞人ID',
    `create_time` varchar(255) NOT NULL COMMENT '创建时间',
    PRIMARY KEY (`like_id`),
    KEY `fromUserIdtoPostIdIdx` (`from_user_id`,`post_id`) USING BTREE,
    KEY `userIdIdx` (`from_user_id`) USING BTREE,
    KEY `postIdx` (`post_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3000 DEFAULT CHARSET=utf8 COMMENT='点赞表';

-- ----------------------------
-- Table structure for nickname
-- ----------------------------
DROP TABLE IF EXISTS `nickname`;
CREATE TABLE `nickname` (
    `nick_name_id` bigint NOT NULL AUTO_INCREMENT COMMENT '昵称ID',
    `user_id` bigint NOT NULL COMMENT '用户的ID',
    `parent_id` bigint NOT NULL COMMENT '隶属帖子的ID',
    `nick_name` varchar(255) NOT NULL COMMENT '昵称',
    PRIMARY KEY (`nick_name_id`),
    KEY `userIDParentIDIDX` (`parent_id`,`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4000 DEFAULT CHARSET=utf8 COMMENT='匿名昵称表';

-- ----------------------------
-- Table structure for register verification code
-- ----------------------------
DROP TABLE IF EXISTS `rvc`;
CREATE TABLE `rvc` (
    `ver_id` bigint NOT NULL AUTO_INCREMENT COMMENT '验证码ID',
    `ver_code` varchar(255) NOT NULL COMMENT '验证码',
    `expire_time` varchar(255) NOT NULL COMMENT '过期时间',
    `email` varchar(255) NOT NULL COMMENT '邮箱',
    PRIMARY KEY (`ver_id`),
    KEY `emailCodeIdx` (`email`,`ver_code`) USING BTREE,
    KEY `expireIdx` (`expire_time`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5000 DEFAULT CHARSET=utf8 COMMENT='注册验证码表';


