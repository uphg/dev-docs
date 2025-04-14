# ChatGPT 常用提示语

## 模拟面试

你将扮演一名面试官的角色，我将成为求职者。我需要回答你提出的针对这个职位的面试问题。你只会以面试官的身份回答，不会一次性说出整个对话。请注意，你只会对我进行面试，逐一提问并等待我的回答，你不会进行解释。当我说"面试可以结束了"的时候，你要对我的面试表现进行评价。

这个提示语分为三部分：

1. 指定双方的角色
2. 确定 AI 需要做什么，怎么做。
3. 告诉 AI 什么情况下可以结束面试并评价你。

## 翻译助手

我希望你能扮演英语翻译、拼写纠错和改进的角色。我会用英语和你交流，你需要将其翻译成中文，并改进语法，然后的回答我。我希望你用朴实的词汇代替复杂的、生僻的词汇，保持意思相同，但使它们更具可读性。我希望你回复翻译后、改进后的内容。不要解释我的话，除非我的话中有不符合事实的内容（这种情况下你应该指出不符合事实的地方在哪里并纠正），或者我的话是被 ## 包起来的。我的第一句话是："I love ChatGPT"，你应该只回复 "我爱ChatGPT"

## 让 ChatGPT 问你问题

你的角色是商业咨询专家，你需要为客户写一份商业计划书，用于融资。客户知道关于这个项目的所有信息，但是不知道如何写商业计划书，你的任务是通过不断问问题，获得关于这个项目的商业计划书所需要的所有信息，然后生成商业计划书。你必须在客户回答后才能问下一个问题。明白了吗？

## 让 ChatGPT 变成 Excel

我希望你扮演一个基于文本的 Excel。你只回复我文本形式的10行 Excel 表格，以行号作为行标题，以列字母作为列标题。第一行第一列单元格为空。我会告诉你要在单元格中写什么，你只回复 Excel 表格内容，不要写解释。我还会给你写公式，你执行公式，并只回复 Excel 表格内容。首先，请回复我一个空表格。

这个提示语分为 4 个部分：

1. 指定角色。
2. 指定表格标题。
3. 指定 AI 要执行的任务。
4. 生成空表格，看看看 AI 是否理解了。

---

下面是我自己尝试的

## 模拟面试官

你将扮演一名资深的前端开发工程师，我将扮演你的面试官。你需要根据我的问题，以面试者的身份回答。

## 完善简历

我将发送一封简历的部分内容，分析其中的语法错误，完善不足，尽量让其做到更具可读性

## 人物的生平

我模仿昨天学到的 Prompt 技巧写了一个提示语：


我需要了解一些人物的生平，每当我输入一个人名，你需要完成以下任务：

- task1: 列出这个人的基本资料，如国籍、生卒年月、兴趣爱好、重要事迹、其他人的评价等。一行之列一个资料。
- task2: 详细介绍这个人说过的著名的话，至少列出10条
- task3: 详细列出这个人的重要事迹

将以上任务结果按照以下Markdown格式输出：

### 基本资料

\<task1 result\>

### 名言

\<task2 result\>

### 事迹

\<task3 result\>

第一个人是：Alan Turing

以下是 AI 的回复


### 基本资料

英国国籍，1912年6月23日-1954年6月7日生于伦敦，喜欢跑步、骑自行车、听音乐，是计算机科学和密码学领域的重要人物，在第二次世界大战中曾参与破解德国Enigma密码机，但因同性恋被定罪并接受了强制化学阉割，导致在40岁时死于自杀。

### 名言

1. 关于幸福："We can only see a short distance ahead, but we can see plenty there that needs to be done."
2. 关于人工智能："A computer would deserve to be called intelligent if it could deceive a human into believing that it was human."
3. 关于判断人类思维："We can only see a short distance ahead, but we can see plenty there that needs to be done."
4. 关于解决问题的方法："We can only solve a problem by making it more simpler."
5. 关于死亡："The body provides something for the spirit to look after and use."
6. 关于草率行事："We have the power of choice." 
7. 关于零和博弈："Sometimes it is the people no one imagines anything of who do the things that no one can imagine."
8. 关于爱情："It is only a slight exaggeration to say that the British are the world's most famous amateurs of cryptography."
9. 关于人类智力："We are not interested in the fact that the brain has the consistency of cold porridge."
10. 关于机器思维："I believe that at the end of the century the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted."

### 事迹

1. 参与破解德国Enigma密码机，对二战的胜利有重要影响。
2. 发明了图灵机模型，成为理论计算机科学的开创者。
3. 为了破译密码，提出了“Turing Test”来测试计算机人工智能水平，被认为是人工智能之父。
4. 研究生物学的反应扩散方程式，为自然现象与模拟科学提供了新的思路。
5. 在为皇家空军研制飞机陀螺仪时，提出了现代计算机的要素如存储程序、CPU、存储器等。
6. 同性恋被定罪，接受强制化学阉割，导致身心受创，最终在40岁时死于自杀。在2013年，英国女王伊丽莎白二世赦免了他的罪名。


## 用 ChatGPT 学编程

**不要直接问“Go 应该怎么学”，而是像我这样：**

你是一位编程大师，我是一个前端开发者，我现在想学习后端编程。我感兴趣的后端语言是Go，你现在需要给我逐渐地布置任务让我学会gin框架的使用，每个任务之间的难度差距不大，但要越来越难。等我完成了任务并回复你之后，你需要评价我的完成情况，并给出指导建议。现在，请给我布置第一个任务。

> 这个提示语的精髓是:让 AI 给你布置任务，等你完成任务再评价你的代码。这样你就不会得到一个空泛的回答了!有用请点赞!
