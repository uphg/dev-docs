# Windows 报错

## KB5034441 更新失败错误代码 0x80070643

调整恢复分区步骤：

1. 关闭 BitLocker（默认关闭可跳过）。
2. 打开命令提示符（管理员）。
3. 依次运行以下命令：
    ```sh
    # 关闭恢复分区
    reagentc /disable 

    # 启用磁盘管理工具
    diskpart 

    # 显示磁盘列表
    list disk 

    # 选择c盘所在的磁盘，数字就是 C 盘所在磁盘的数字
    sel disk [数字]

    # 显示分区列表
    list part

    # 务必不要选择错误！选择恢复分区，数字就是恢复分区的数字。没有恢复分区的跳过这个步骤
    sel part [数字]

    # 删除这个分区。如果分区选择错了，将删除错误的分区！没有恢复分区的跳过这个步骤
    delete partition override 

    # 选择系统所在分区，数字就是"主要"分区的数字。没有恢复分区的从这一步开始继续操作
    sel part [数字]

    # 从系统盘分出250MB空间
    shrink desired=250 minimum=250 

    # 创建恢复分区，并设置格式
    create partition primary id=de94bba4-06d1-4d40-a16a-bfd50179d6ac  
    gpt attributes =0x8000000000000001 
    format quick fs=ntfs label=”Windows RE tools” 

    # 退出磁盘管理工具
    exit 

    # 启用恢复分区
    reagentc /enable 
    ```
4. 重启电脑，然后再尝试更新KB5034441。
5. 若是上述步骤都成功执行，仍然显示 `0x80070643` 的错误，可以从头再执行一遍，并且把恢复分区改成 1G 的大小，也就是这个命令 `shrink desired=250 minimum=250` 改成 `shrink desired=1024 minimum=1024`

### 参考

- [KB5034441更新失败错误代码0x80070643【解决方案】](https://answers.microsoft.com/zh-hans/windows/forum/all/kb5034441%e6%9b%b4%e6%96%b0%e5%a4%b1%e8%b4%a5/7ba68fea-7425-4ba0-8fdc-f48bc9191497)
- [微软承认错误：Win10 安装 3 月更新后再推送去年 10 月更新](https://www.msn.cn/zh-cn/news/other/%E5%BE%AE%E8%BD%AF%E6%89%BF%E8%AE%A4%E9%94%99%E8%AF%AF-win10-%E5%AE%89%E8%A3%85-3-%E6%9C%88%E6%9B%B4%E6%96%B0%E5%90%8E%E5%86%8D%E6%8E%A8%E9%80%81%E5%8E%BB%E5%B9%B4-10-%E6%9C%88%E6%9B%B4%E6%96%B0/ar-BB1jsz3T)