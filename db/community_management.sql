/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50723
 Source Host           : localhost:3306
 Source Schema         : community_management

 Target Server Type    : MySQL
 Target Server Version : 50723
 File Encoding         : 65001

 Date: 28/01/2019 15:58:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `role` int(11) NOT NULL COMMENT '1: 管理员 2： 超级管理员',
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'admin', '96e79218965eb72c92a549dd5a330112', 2, 0);
INSERT INTO `admin` VALUES (2, 'bbb', 'bbb', '96e79218965eb72c92a549dd5a330112', 2, 0);
INSERT INTO `admin` VALUES (3, 'test1', 'test', '96e79218965eb72c92a549dd5a330112', 1, 0);

-- ----------------------------
-- Table structure for community
-- ----------------------------
DROP TABLE IF EXISTS `community`;
CREATE TABLE `community`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `community_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `belong_dept` int(11) NOT NULL,
  `manage_dept` int(11) NOT NULL,
  `chairman_stu_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `create_time` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '0: 未审核; 1: 已审核; 2：已注销',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community
-- ----------------------------
INSERT INTO `community` VALUES (1, '天津财经大学社团联合会', 'test11', 1, 1, 2014111634, 1, '1136044800000', 1);
INSERT INTO `community` VALUES (2, '天津财经大学民乐团', NULL, 1, 2, 2014111634, 2, '978278400000', 1);
INSERT INTO `community` VALUES (3, '天津财经大学管弦乐团', NULL, 1, 1, 2014111634, 2, '978278400000', 1);
INSERT INTO `community` VALUES (4, '天津财经大学艺体团', 'test', 1, 1, 2014111634, 2, '1544595711208', 1);
INSERT INTO `community` VALUES (5, '天津财经大学舞蹈团', '这是个舞蹈团', 1, 2, 2014111634, 2, '1546422677499', 1);
INSERT INTO `community` VALUES (6, '天津财经大学合唱团', '合唱团合唱团，唱歌的团', 2, 1, 2014111634, 2, '1546487982416', 1);
INSERT INTO `community` VALUES (7, '中国特色社会主义理论研究会', '社会主义好', 1, 1, 2014111634, 3, '1547002780183', 1);
INSERT INTO `community` VALUES (8, '大学生自律委员会', '自律自律', 1, 1, 2014111634, 1, '1547002817993', 1);
INSERT INTO `community` VALUES (9, '大学生体育协会', '运动！', 1, 3, 2014111634, 4, '1547003079353', 1);
INSERT INTO `community` VALUES (10, '天津财经大学科技协会', '科技是第一生产力', 1, 3, 2014111634, 6, '1547003124051', 1);
INSERT INTO `community` VALUES (11, '天津财经大学青年志愿者协会', '志协耶', 1, 3, 2014111634, 5, '1547003158826', 1);

-- ----------------------------
-- Table structure for community_student
-- ----------------------------
DROP TABLE IF EXISTS `community_student`;
CREATE TABLE `community_student`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `role` int(11) NOT NULL COMMENT '0: 成员\r\n1: 社团管理员',
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community_student
-- ----------------------------
INSERT INTO `community_student` VALUES (1, 2014111634, 1, 0, 1);
INSERT INTO `community_student` VALUES (2, 2014111634, 2, 1, 0);

-- ----------------------------
-- Table structure for community_type
-- ----------------------------
DROP TABLE IF EXISTS `community_type`;
CREATE TABLE `community_type`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community_type
-- ----------------------------
INSERT INTO `community_type` VALUES (1, '其他', '0');
INSERT INTO `community_type` VALUES (2, '文艺', '0');
INSERT INTO `community_type` VALUES (3, '学术', '0');
INSERT INTO `community_type` VALUES (4, '体育', '0');
INSERT INTO `community_type` VALUES (5, '公益', '0');
INSERT INTO `community_type` VALUES (6, '科技', '0');

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES (1, '学工部', 0);
INSERT INTO `dept` VALUES (2, '学工部艺术教育中心', 0);
INSERT INTO `dept` VALUES (3, '校团委', 0);
INSERT INTO `dept` VALUES (4, '学工部心理健康教育中心', 0);
INSERT INTO `dept` VALUES (5, '公寓管理中心', 0);
INSERT INTO `dept` VALUES (6, '学工部就业指导中心', 0);
INSERT INTO `dept` VALUES (7, '招生考试办公室', 0);
INSERT INTO `dept` VALUES (8, '学工部武装部', 0);
INSERT INTO `dept` VALUES (9, '学工部保卫处', 0);
INSERT INTO `dept` VALUES (10, '会计一系', 0);
INSERT INTO `dept` VALUES (11, '会计一系文艺部', 0);
INSERT INTO `dept` VALUES (12, '会计一系学习部', 0);
INSERT INTO `dept` VALUES (13, '会计一系社团联', 0);
INSERT INTO `dept` VALUES (14, '会计一系体育部', 0);
INSERT INTO `dept` VALUES (15, '会计一系生活部', 0);
INSERT INTO `dept` VALUES (16, '会计二系学工办', 0);
INSERT INTO `dept` VALUES (17, '企管系', 0);
INSERT INTO `dept` VALUES (18, '管科系', 0);
INSERT INTO `dept` VALUES (19, '营销系', 0);
INSERT INTO `dept` VALUES (20, '营销系学工办', 0);
INSERT INTO `dept` VALUES (21, '管信系', 0);
INSERT INTO `dept` VALUES (22, '旅游系', 0);
INSERT INTO `dept` VALUES (23, '旅游系团总支', 0);
INSERT INTO `dept` VALUES (24, '旅游系学工部', 0);
INSERT INTO `dept` VALUES (25, '金融系', 0);
INSERT INTO `dept` VALUES (26, '金融信用学工部', 0);
INSERT INTO `dept` VALUES (27, '国贸系', 0);
INSERT INTO `dept` VALUES (28, '国贸系团总支', 0);
INSERT INTO `dept` VALUES (29, '财政系', 0);
INSERT INTO `dept` VALUES (30, '财政系业余党校', 0);
INSERT INTO `dept` VALUES (31, '人文学院', 0);
INSERT INTO `dept` VALUES (32, '理工学院', 0);
INSERT INTO `dept` VALUES (33, '理工学院学工办', 0);
INSERT INTO `dept` VALUES (34, '法学院', 0);
INSERT INTO `dept` VALUES (35, '法学院学生会', 0);
INSERT INTO `dept` VALUES (36, '艺术学院', 0);
INSERT INTO `dept` VALUES (37, '实验班', 0);
INSERT INTO `dept` VALUES (38, '体训部', 0);
INSERT INTO `dept` VALUES (39, '创新与创业研究中心', 0);
INSERT INTO `dept` VALUES (40, '图书馆', 0);
INSERT INTO `dept` VALUES (41, '经济系', 0);
INSERT INTO `dept` VALUES (42, '经济系团总支', 0);
INSERT INTO `dept` VALUES (43, '国际工商学院', 0);
INSERT INTO `dept` VALUES (44, '国际工商学院团总支', 0);

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isDel` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, 'test', 'test', '<h1>test</h1>', '1542955541456', 0);
INSERT INTO `notice` VALUES (2, 'testtitle', 'testzuozhe', '<p>a<em>erq</em>wew<strong>ewqe</strong></p>\n', '1546941430033', 0);
INSERT INTO `notice` VALUES (3, '新增一个图片公告', '妈耶', '<p>妈耶妈耶</p>\n<p></p>\n<img src=\"http://localhost:3000/public/img/notice_1547113994143hxdhjagkoos.jpg\" alt=\"undefined\" style=\"float:none;height: auto;width: auto\"/>\n<p></p>\n<p>妈耶</p>\n', '1547113998496', 0);
INSERT INTO `notice` VALUES (4, '测试滚动', '滚动', '<p></p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n<p></p>\n<p>test&nbsp;</p>\n<p></p>\n<p><br>&nbsp;</p>\n', '1547172573974', 0);
INSERT INTO `notice` VALUES (6, '测试', '测试', '<p>测试</p>\n', '1547175157568', 1);
INSERT INTO `notice` VALUES (7, '测试跳转', '跳转', '<p>路由的跳转</p>\n', '1547175863951', 0);

-- ----------------------------
-- Table structure for notice_log
-- ----------------------------
DROP TABLE IF EXISTS `notice_log`;
CREATE TABLE `notice_log`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `notice_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice_log
-- ----------------------------
INSERT INTO `notice_log` VALUES (1, 1, 2014111634, '1547094464000');
INSERT INTO `notice_log` VALUES (2, 2, 2014111634, '1547094464123');
INSERT INTO `notice_log` VALUES (3, 1, 2014111634, '1547094465454');
INSERT INTO `notice_log` VALUES (4, 3, 2014111634, '1547094469999');
INSERT INTO `notice_log` VALUES (5, 4, 2014111634, '1547094499999');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `stu_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stu_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` int(1) NOT NULL COMMENT '1: 男; 2: 女',
  PRIMARY KEY (`stu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('2014111634', '0', 'test', '13555555555', 1);
INSERT INTO `student` VALUES ('2015111624', '0', '赵秀', '15744578456', 2);
INSERT INTO `student` VALUES ('2015111625', '0', '李雯', '15620227456', 2);
INSERT INTO `student` VALUES ('2015111626', '0', '郭靖', '15692240123', 2);
INSERT INTO `student` VALUES ('2015111627', '0', '赵义', '15122103432', 1);
INSERT INTO `student` VALUES ('2015111628', '0', '余金', '18810285435', 1);

SET FOREIGN_KEY_CHECKS = 1;
