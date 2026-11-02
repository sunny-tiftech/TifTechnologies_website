/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.19-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: tif_db
-- ------------------------------------------------------
-- Server version	10.11.19-MariaDB-0+deb12u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` varchar(64) NOT NULL,
  `name` varchar(120) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `service` varchar(120) DEFAULT NULL,
  `budget` varchar(60) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES
('90da2f85762b4006a7eeb0e3a2217cbf','MySQL Test','mysql@example.com','','Web Development','₹1 Lakh – ₹3 Lakh','Verifying MySQL storage with ₹ symbols.','2026-10-27T15:07:36.580362+00:00');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_pages`
--

DROP TABLE IF EXISTS `custom_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_pages` (
  `slug` varchar(80) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `intro` text DEFAULT NULL,
  `body` text DEFAULT NULL,
  `created_at` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_pages`
--

LOCK TABLES `custom_pages` WRITE;
/*!40000 ALTER TABLE `custom_pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_attempts`
--

DROP TABLE IF EXISTS `login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_attempts` (
  `identifier` varchar(255) NOT NULL,
  `count` int(11) DEFAULT NULL,
  `last` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_attempts`
--

LOCK TABLES `login_attempts` WRITE;
/*!40000 ALTER TABLE `login_attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `login_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_content`
--

DROP TABLE IF EXISTS `site_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_content` (
  `doc_key` varchar(50) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  PRIMARY KEY (`doc_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_content`
--

LOCK TABLES `site_content` WRITE;
/*!40000 ALTER TABLE `site_content` DISABLE KEYS */;
INSERT INTO `site_content` VALUES
('site','{\"site\": {\"brand\": \"Tif Technologies\", \"tagline\": \"Turning Ideas Into Intelligent Digital Solutions\", \"email\": \"sales@tiftechnologies.com\"}, \"hero\": {\"eyebrow\": \"Tif Technologies\", \"line1\": \"Turning Ideas\", \"line2\": \"Into Intelligent\", \"accent\": \"Intelligent\", \"line3\": \"Digital Solutions.\", \"sub\": \"We build, scale, and grow businesses through innovative software, modern web experiences, mobile applications, AI-powered solutions, and digital strategies.\", \"stats\": [{\"value\": \"12\", \"label\": \"Products shipped\"}, {\"value\": \"10\", \"label\": \"Service lines\"}, {\"value\": \"04\", \"label\": \"Live news platforms\"}]}, \"about\": {\"eyebrow\": \"About Tif Technologies\", \"heading\": \"A factory for ideas,\", \"headingAccent\": \"engineered for scale.\", \"lead\": \"We help businesses build, scale, and grow through innovative software, modern web experiences, mobile applications, AI-powered solutions, and digital strategies.\", \"body\": \"Reliable, scalable, and user-focused solutions tailored to real business needs \\u2014 from building digital products from scratch to enhancing existing platforms, streamlining business processes, managing leads, automating workflows, and integrating intelligent technologies.\", \"highlights\": [{\"icon\": \"globe\", \"title\": \"Build from scratch\", \"sub\": \"Digital products engineered end-to-end.\"}, {\"icon\": \"sparkles\", \"title\": \"Enhance & scale\", \"sub\": \"Existing platforms made faster, sharper, stronger.\"}, {\"icon\": \"bot\", \"title\": \"Automate with AI\", \"sub\": \"Intelligent workflows and agents in production.\"}]}, \"servicesPage\": {\"eyebrow\": \"Services\", \"line1\": \"Capabilities across the\", \"line2\": \"full product lifecycle.\", \"accent\": \"lifecycle.\", \"sub\": \"From the first wireframe to production scale \\u2014 web, mobile, backend, AI, marketing, and loyalty. Ten ways we turn ideas into working software.\"}, \"portfolioPage\": {\"eyebrow\": \"Portfolio\", \"line1\": \"Work that\'s already\", \"line2\": \"out in the wild.\", \"accent\": \"wild.\", \"sub\": \"News platforms with custom CRMs, healthcare and lab portals, governance research, and loyalty \\u2014 products we designed, built, and shipped.\"}, \"contactPage\": {\"eyebrow\": \"Contact\", \"line1\": \"Let\'s build your\", \"line2\": \"next big thing.\", \"accent\": \"big thing.\", \"sub\": \"Launching a product, building a platform, integrating AI, or automating workflows \\u2014 tell us where you want to go, and Tif Technologies will help turn your vision into reality.\", \"budgets\": [\"Under \\u20b91 Lakh\", \"\\u20b91 Lakh \\u2013 \\u20b93 Lakh\", \"\\u20b93 Lakh \\u2013 \\u20b910 Lakh\", \"\\u20b910 Lakh+\"], \"steps\": [{\"num\": \"01\", \"text\": \"We review your requirements and goals.\"}, {\"num\": \"02\", \"text\": \"We schedule a discovery call with you.\"}, {\"num\": \"03\", \"text\": \"You get a proposal with scope and timeline.\"}]}, \"cta\": {\"line1\": \"Have an idea? Let\'s turn it into an\", \"accent\": \"intelligent digital solution.\", \"sub\": \"Tell us where you want to go \\u2014 we\'ll engineer the way there.\"}, \"services\": [{\"num\": \"01\", \"icon\": \"globe\", \"title\": \"Web Development\", \"desc\": \"Modern, responsive, and high-performance websites and web platforms.\", \"features\": [\"Corporate & product websites\", \"Web platforms & portals\", \"Performance-first builds\"]}, {\"num\": \"02\", \"icon\": \"smartphone\", \"title\": \"Mobile App Development\", \"desc\": \"Feature-rich mobile applications for Android and iOS using modern mobile technologies.\", \"features\": [\"Android & iOS\", \"Flutter & React Native\", \"App-store ready delivery\"]}, {\"num\": \"03\", \"icon\": \"server\", \"title\": \"Backend & Custom Software Development\", \"desc\": \"Robust backend systems, APIs, business applications, and tailored software solutions.\", \"features\": [\"APIs & microservices\", \"Business applications\", \"Platform modernisation\"]}, {\"num\": \"04\", \"icon\": \"target\", \"title\": \"Leads Management Systems\", \"desc\": \"Customized lead management to capture, organize, track, and manage leads, sales pipelines, follow-ups, and business opportunities.\", \"features\": [\"Meta Lead Ads integration\", \"Automated lead syncing\", \"CRM connectivity & follow-ups\"]}, {\"num\": \"05\", \"icon\": \"sparkles\", \"title\": \"AI Solutions & API Integrations\", \"desc\": \"Integration of AI APIs into websites, mobile apps, and business systems to enable intelligent features, content processing, conversational experiences, and workflow automation.\", \"features\": [\"LLM integrations\", \"Content processing\", \"Conversational experiences\"]}, {\"num\": \"06\", \"icon\": \"bot\", \"title\": \"AI Agents & Automation\", \"desc\": \"AI-powered agents, tool integrations, and automated workflows to streamline business operations and improve productivity.\", \"features\": [\"Autonomous AI agents\", \"Workflow automation\", \"Tool integrations\"]}, {\"num\": \"07\", \"icon\": \"newspaper\", \"title\": \"News Websites & CRM Solutions\", \"desc\": \"Digital publishing platforms, newsroom workflows, content management, and customized CRM solutions.\", \"features\": [\"Digital publishing platforms\", \"Newsroom workflows\", \"Custom news CRM\"]}, {\"num\": \"08\", \"icon\": \"megaphone\", \"title\": \"Social Media Marketing\", \"desc\": \"Social media strategy, content, audience engagement, and brand visibility.\", \"features\": [\"Strategy & planning\", \"Content & creatives\", \"Audience engagement\"]}, {\"num\": \"09\", \"icon\": \"trending\", \"title\": \"Search Engine Optimization (SEO)\", \"desc\": \"Improving search visibility, organic traffic, and digital discoverability.\", \"features\": [\"Technical SEO\", \"Content & keywords\", \"Organic growth\"]}, {\"num\": \"10\", \"icon\": \"gift\", \"title\": \"Loyalty Program Solutions\", \"desc\": \"Technology-driven loyalty programs and customer engagement platforms.\", \"features\": [\"Points & rewards engine\", \"Customer engagement\", \"Redemption platforms\"]}], \"techGroups\": [{\"label\": \"Frontend\", \"items\": [\"Next.js\", \"React.js\"]}, {\"label\": \"Backend\", \"items\": [\"Node.js\", \"Python\", \"Django\"]}, {\"label\": \"Mobile\", \"items\": [\"Flutter\", \"React Native\"]}, {\"label\": \"Databases\", \"items\": [\"MySQL\", \"PostgreSQL\", \"Microsoft SQL Server\", \"MongoDB\"]}, {\"label\": \"AI & Automation\", \"items\": [\"AI API Integrations\", \"LLM Integrations\", \"AI Agents\", \"Conversational AI\", \"Workflow Automation\"]}], \"approach\": [{\"num\": \"01\", \"title\": \"Discover\", \"desc\": \"We understand your business, users, and goals before a single line of code.\"}, {\"num\": \"02\", \"title\": \"Architect\", \"desc\": \"We design the right stack and system for scale, speed, and cost.\"}, {\"num\": \"03\", \"title\": \"Build & Integrate\", \"desc\": \"We develop the product, integrate AI, and automate workflows with craft.\"}, {\"num\": \"04\", \"title\": \"Launch & Grow\", \"desc\": \"We deploy, measure, and keep improving \\u2014 from SEO to loyalty engagement.\"}], \"portfolio\": [{\"slug\": \"news-arena-india\", \"name\": \"News Arena India\", \"domain\": \"newsarenaindia.com\", \"url\": \"https://newsarenaindia.com\", \"category\": \"News & Publishing\", \"description\": \"High-speed digital news publishing portal with newsroom workflow, CRM, and breaking news distribution.\", \"overview\": \"A national news publishing portal engineered for speed \\u2014 because news cannot wait. The platform pairs a fast public-facing site with a custom newsroom CRM so editors can publish, organise, and distribute stories the moment they break.\", \"tech\": [\"Next.js\", \"React.js\", \"Node.js\", \"PostgreSQL\"], \"built\": [\"Public news portal engineered for fast page loads\", \"Custom newsroom CRM for the editorial workflow\", \"Breaking news publishing and distribution flows\", \"Analytics-ready content architecture\"], \"image\": \"/assets/work/work-news-arena-india.jpeg\", \"gallery\": [\"/assets/work/work-news-arena-india.jpeg\", \"/assets/work/work-news-arena-india-2.jpeg\", \"/assets/work/work-news-arena-india-3.jpeg\"], \"extraLinks\": [], \"featured\": true}, {\"slug\": \"khabar-gaon\", \"name\": \"Khabar Gaon\", \"domain\": \"khabargaon.com\", \"url\": \"https://khabargaon.com\", \"category\": \"News & Publishing\", \"description\": \"Regional hyperlocal news system engineered for multi-author editorial management and high-traffic days.\", \"overview\": \"A hyperlocal Hindi news platform serving regional readers with the same engineering rigour as national portals. Multi-author editorial management keeps the newsroom moving, while the system stays resilient on high-traffic news days.\", \"tech\": [\"Next.js\", \"React.js\", \"Node.js\", \"PostgreSQL\"], \"built\": [\"Hyperlocal news publishing system\", \"Multi-author editorial management\", \"High-traffic day resilience\", \"Regional content structure\"], \"image\": \"/assets/work/work-khabar-gaon.jpeg\", \"gallery\": [\"/assets/work/work-khabar-gaon.jpeg\", \"/assets/work/work-khabar-gaon-2.jpeg\", \"/assets/work/work-khabar-gaon-3.jpeg\"], \"extraLinks\": [], \"featured\": false}, {\"slug\": \"news-4-himachal\", \"name\": \"News 4 Himachal\", \"domain\": \"news4himachal.in\", \"url\": \"https://news4himachal.in\", \"category\": \"News & Publishing\", \"description\": \"State-wide news engine with custom editorial roles, multimedia distribution, and an analytics dashboard.\", \"overview\": \"A state-wide news engine covering Himachal with custom editorial roles and permissions. Multimedia stories are distributed from one dashboard, with analytics showing the newsroom what readers engage with most.\", \"tech\": [\"Next.js\", \"React.js\", \"Node.js\", \"PostgreSQL\"], \"built\": [\"State-wide news engine\", \"Custom editorial roles and permissions\", \"Multimedia story distribution\", \"Newsroom analytics dashboard\"], \"image\": \"/assets/work/work-news-4-himachal.jpeg\", \"gallery\": [\"/assets/work/work-news-4-himachal.jpeg\", \"/assets/work/work-news-4-himachal-2.jpeg\", \"/assets/work/work-news-4-himachal-3.jpeg\"], \"extraLinks\": [], \"featured\": false}, {\"slug\": \"jist-news\", \"name\": \"Jist News\", \"domain\": \"jist.news\", \"url\": \"https://jist.news\", \"category\": \"News & Publishing\", \"description\": \"Video-first political news platform with signature show formats, subscriptions, and membership flows.\", \"overview\": \"A video-first political news destination built around signature shows \\u2014 The Hotspot, Breaking Down, On The Record, and Jist Townhall. Sign-in, subscription, and watch flows turn casual viewers into a loyal audience.\", \"tech\": [\"Next.js\", \"React.js\", \"Node.js\", \"PostgreSQL\"], \"built\": [\"Video-first news platform\", \"Signature show and series pages\", \"Subscription and sign-in flows\", \"Content management for shows and articles\"], \"image\": \"/assets/work/work-jist-news.jpeg\", \"gallery\": [\"/assets/work/work-jist-news.jpeg\", \"/assets/work/work-jist-news-2.jpeg\", \"/assets/work/work-jist-news-3.jpeg\"], \"extraLinks\": [], \"featured\": false}, {\"slug\": \"home-ivf\", \"name\": \"Home IVF\", \"domain\": \"homeivf.com\", \"url\": \"https://homeivf.com\", \"category\": \"Websites & Platforms\", \"description\": \"At-home fertility care platform for appointment booking and doctor consultations with a patient portal.\", \"overview\": \"A digital front door for at-home fertility care. Patients book consultations and fertility treatments through a secure portal, while a Flutter companion app keeps care within reach on mobile.\", \"tech\": [\"Next.js\", \"React.js\", \"Node.js\", \"MySQL\"], \"built\": [\"Consultation booking with OTP verification\", \"Doctor consultation patient portal\", \"Secure patient data handling\", \"Flutter mobile companion app\"], \"image\": \"/assets/work/work-home-ivf.jpeg\", \"gallery\": [\"/assets/work/work-home-ivf.jpeg\", \"/assets/work/work-home-ivf-2.jpeg\", \"/assets/work/work-home-ivf-3.jpeg\"], \"extraLinks\": [], \"featured\": true}, {\"slug\": \"dr-gauri-agarwal\", \"name\": \"Dr. Gauri Agarwal\", \"domain\": \"drgauriagarwal.com\", \"url\": \"https://drgauriagarwal.com\", \"category\": \"Websites & Platforms\", \"description\": \"Healthcare specialist digital brand platform with online consultation booking and a patient education hub.\", \"overview\": \"A personal brand platform for a renowned fertility specialist. Patients can book appointments online and learn through an education hub built to rank well in search.\", \"tech\": [\"Next.js\", \"React.js\", \"Node.js\", \"MySQL\"], \"built\": [\"Specialist brand website\", \"Online appointment booking\", \"Patient education hub\", \"SEO-ready content structure\"], \"image\": \"/assets/work/work-dr-gauri-agarwal.jpeg\", \"gallery\": [\"/assets/work/work-dr-gauri-agarwal.jpeg\", \"/assets/work/work-dr-gauri-agarwal-2.jpeg\", \"/assets/work/work-dr-gauri-agarwal-3.jpeg\"], \"extraLinks\": [], \"featured\": false}, {\"slug\": \"genestring-lab\", \"name\": \"Genestring Lab\", \"domain\": \"genestringlab.com\", \"url\": \"https://genestringlab.com\", \"category\": \"Websites & Platforms\", \"description\": \"Diagnostic genetics lab portal with test packages, doorstep sample collection, and digital report delivery.\", \"overview\": \"A diagnostic genetics lab platform that moves the entire testing journey online. Location-aware test and package discovery, doorstep sample collection booking, and digital report delivery replace phone calls and paperwork.\", \"tech\": [\"Next.js\", \"React.js\", \"Node.js\", \"MySQL\"], \"built\": [\"Test and package catalogue with booking\", \"Location-aware doorstep sample collection\", \"Digital report delivery\", \"Clinic system integration\"], \"image\": \"/assets/work/work-genestring-lab.jpeg\", \"gallery\": [\"/assets/work/work-genestring-lab.jpeg\", \"/assets/work/work-genestring-lab-2.jpeg\", \"/assets/work/work-genestring-lab-3.jpeg\"], \"extraLinks\": [], \"featured\": false}, {\"slug\": \"sansadflix\", \"name\": \"Sansadflix\", \"domain\": \"sansadflix.com\", \"url\": \"https://sansadflix.com\", \"category\": \"Websites & Platforms\", \"description\": \"Civic governance and public policy digital video platform delivering streaming content and archive management.\", \"overview\": \"A digital video platform for civic governance and public policy content. Streaming delivery pairs with structured archive management so years of material stay searchable and organised.\", \"tech\": [\"Next.js\", \"Node.js\", \"MongoDB\"], \"built\": [\"Streaming content platform\", \"Structured archive management\", \"Civic and policy content organisation\", \"Scalable media delivery\"], \"image\": \"/assets/work/work-sansadflix.jpeg\", \"gallery\": [\"/assets/work/work-sansadflix.jpeg\", \"/assets/work/work-sansadflix-2.jpeg\", \"/assets/work/work-sansadflix-3.jpeg\"], \"extraLinks\": [], \"featured\": false}, {\"slug\": \"future-shift-labs\", \"name\": \"Future Shift Labs\", \"domain\": \"futureshiftlabs.com\", \"url\": \"https://futureshiftlabs.com\", \"category\": \"Websites & Platforms\", \"description\": \"Tech policy and innovation platform with research publishing, events, and the Global Elections & AI Tracker.\", \"overview\": \"A digital platform for a tech policy think tank \\u2014 advancing digital systems that shape resilient and inclusive futures. Alongside research and events sits the Global Elections & AI Tracker: an interactive map tracking AI\'s impact on elections country by country.\", \"tech\": [\"React.js\", \"Python\", \"Django\", \"PostgreSQL\"], \"built\": [\"Research and events publishing platform\", \"Global Elections & AI Tracker with interactive map\", \"Programs and initiatives showcase\", \"Collaboration and lead capture flows\"], \"image\": \"/assets/work/work-future-shift-labs.jpeg\", \"gallery\": [\"/assets/work/work-future-shift-labs.jpeg\", \"/assets/work/work-future-shift-labs-2.jpeg\", \"/assets/work/work-future-shift-labs-3.jpeg\", \"/assets/work/work-future-shift-tracker.jpeg\"], \"extraLinks\": [{\"label\": \"tracker.futureshiftlabs.com\", \"url\": \"https://tracker.futureshiftlabs.com\"}], \"featured\": false}, {\"slug\": \"govern-better\", \"name\": \"GovernBetter\", \"domain\": \"governbetter.co\", \"url\": \"https://governbetter.co\", \"category\": \"Websites & Platforms\", \"description\": \"Governance research and public policy publications platform.\", \"overview\": \"A governance research lab\'s digital home. Long-form policy publications are organised, searchable, and easy to read \\u2014 turning research into influence.\", \"tech\": [\"Next.js\", \"Node.js\", \"MongoDB\"], \"built\": [\"Publications library\", \"Research article system\", \"Category and search experience\", \"Editorial publishing workflows\"], \"image\": \"/assets/work/work-govern-better.jpeg\", \"gallery\": [\"/assets/work/work-govern-better.jpeg\", \"/assets/work/work-govern-better-2.jpeg\"], \"extraLinks\": [], \"featured\": false}, {\"slug\": \"fundle-loyalty-program\", \"name\": \"Fundle Loyalty Program\", \"domain\": \"newu.fundlezone.com\", \"url\": \"https://newu.fundlezone.com\", \"category\": \"Loyalty Programs\", \"description\": \"AI-powered loyalty and customer engagement platform for malls and retail brands \\u2014 rewards, analytics, and campaign intelligence at scale.\", \"overview\": \"Fundle is an AI-powered loyalty and retail intelligence platform for malls and retail brands. A Reward Desk runs day-to-day customer registration, billing, and rewards, while deep analytics track customers, transactions, repeat purchases, and earn/redeem patterns across locations \\u2014 with campaign ROI reporting and settings to configure the complete loyalty program.\", \"tech\": [\"Python\", \"Django\", \"MySQL\", \"MongoDB\"], \"built\": [\"Reward Desk for customer registration, billing, and rewards\", \"Location-wise customer and transaction analytics\", \"Earn, redeem, bonus, and expired points tracking\", \"Repeat-purchase and campaign ROI insights\", \"SMS configuration for registration, earn, redeem and OTP flows\", \"Support Desk and complete program configuration\"], \"image\": \"/assets/fundle/fundle-5.png\", \"gallery\": [\"/assets/fundle/fundle-5.png\", \"/assets/fundle/fundle-4.png\", \"/assets/fundle/fundle-3.png\", \"/assets/fundle/fundle-1.png\", \"/assets/fundle/fundle-2.png\", \"/assets/fundle/fundle-6.png\", \"/assets/fundle/fundle-7.png\", \"/assets/fundle/fundle-8.png\"], \"extraLinks\": [], \"featured\": true}]}');
/*!40000 ALTER TABLE `site_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_checks`
--

DROP TABLE IF EXISTS `status_checks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_checks` (
  `id` varchar(64) NOT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `timestamp` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_checks`
--

LOCK TABLES `status_checks` WRITE;
/*!40000 ALTER TABLE `status_checks` DISABLE KEYS */;
/*!40000 ALTER TABLE `status_checks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(64) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(120) DEFAULT NULL,
  `role` varchar(40) DEFAULT NULL,
  `created_at` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
('e0f785e9fcd74f9bb683b074914cd1d1','admin@tiftechnologies.com','$2b$12$s.LXNUFoUlLieQb8YrI1wOYtlaNpwaem8k/wkjyqOmhatOqcDH23C','Admin','admin','2026-10-27T15:07:04.155112+00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-02 12:01:37
