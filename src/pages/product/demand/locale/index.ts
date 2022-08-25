const i18n = {
  "en-US": {},
  "zh-CN": {
    "menu.title": "需求导入",
    "menu.hardware.selection": "硬件选型",
    "menu.production.service.selection": "生产服务选型",
    "menu.production.service.selection.title": "服务选型",
    "menu.production.service.selection.requirements.details": "需求细节",
    "menu.production.service.selection.requirements.details.firmware":
      "定制固件",
    "menu.production.service.selection.requirements.details.mac": "定制 MAC",
    "menu.production.service.selection.requirements.details.burn":
      "定制烧录内容",
    "menu.production.service.selection.requirements.details.pre-fit":
      "定制预适配模组",
    "menu.production.service.selection.requirements.details.custom.label":
      "定制标签",
    "menu.production.service.selection.check": "自助校验",
    "menu.production.service.selection.overview": "需求总览",
    "hardware.production.info.title": "产品选型",
    "hardware.production.info": "类别",
    "hardware.production.info.chip": "芯片",
    "hardware.production.info.chip.description": "芯片描述信息",
    "hardware.production.info.modules": "模组",
    "hardware.production.info.modules.description": "模组描述信息",
    "hardware.production.info.soc": "单/双核",
    "hardware.production.info.soc.antenna": "天线",
    "hardware.production.info.soc.package": "封装",
    "hardware.production.info.soc.model": "型号",
    "hardware.production.info.soc.temperature": "温度 (C)",
    "hardware.production.info.soc.flash": "Flash大小 (MB)",
    "hardware.production.info.soc.psram": "PSRAM大小 (MB)",
    "hardware.production.info.module.model": "搭载芯片型号",
    "hardware.production.info.module.temperature": "工作温度 (°C)",
    "hardware.production.info.module.flash": "Flash大小 (MB)",
    "hardware.production.info.module.psram": "PSRAM大小 (MB)",
    "hardware.production.info.operate": "重置",
    "hardware.production.info.next": "保存",
    "hardware.production.info.total": "产品总数为: ",
    "hardware.production.info.select.model": "您已选择的产品名称为 : ",
    "hardware.production.info.select.model.error": "尚未选择具体产品型号",
    "hardware.production.info.select.model.demand.error": "尚未分配有效需求编号",
    "hardware.modal.title": "产品硬件型号确认",
    "hardware.modal.info": "产品信息如下:",
    "service.preselection.model.info.title": "产品信息:",
    "service.preselection.model.info.title.description": "针对这款产品, 我们提供以下定制生产服务, 请根据实际需要 选择您需要的服务 :",
    "service.preselection.model.info.title.list": "生产服务列表 :",
    "service.preselection.model.info.title.switch.open": "已选择",
    "service.preselection.model.info.title.switch.close": "未启用",
    "service.preselection.model.info.title.open": "已启用",
    "service.preselection.model.service.total": "已选择 服务项数 : ",
    "service.modal.title": "生产服务确认",
    "service.preselection.model.service.info": "您选择的生产定制服务为: ",
    "firmware.customization.title": "固件定制",
    "firmware.customization.info.version": "您的固件版本 : ",
    "firmware.customization.info.version.error": "固件版本不能为空",
    "firmware.customization.info.version.hint": "此信息用于显示在卷盘和外箱标签上",
    "firmware.customization.info.project": "固件所属项目 : ",
    "firmware.customization.info.project.error": "固件所属项目不能为空",
    "firmware.customization.info.project.hint": "请注明固件用于贵司的哪个项目, 如空调",
    "firmware.customization.info.project.form.error": "请填写完整本表单",
    "firmware.customization.info.project.history": "固件导入历史 : ",
    "firmware.customization.info.project.history.error": "固件导入历史不能为空",
    "firmware.customization.info.project.history.first": "项目首次在 ESPRESSIF 导入的固件",
    "firmware.customization.info.project.history.next": "项目在 ESPRESSIF 导入过, 本次为固件升级",
    "firmware.customization.info.project.history.old": "上一版固件料号: ",
    "firmware.customization.info.encryption": "此次导入是否使用 falsh encryption 或者 secure boot ?",
    "firmware.customization.info.encryption.firmware": "加密固件",
    "firmware.customization.info.encryption.firmware.flash": "Falsh 加密",
    "firmware.customization.info.encryption.firmware.secure.boot": "Secure Boot",
    "firmware.customization.info.encryption.firmware.secure.boot.v1": "Secure Boot V1",
    "firmware.customization.info.encryption.firmware.secure.boot.v2": "Secure Boot V2",
    "firmware.customization.info.encryption.firmware.secure.info": "Secure Boot 加密需求细节",
    "firmware.customization.info.encryption.firmware.flash.info": "Flash 加密需求细节",
    "firmware.customization.info.encryption.firmware.flash.only": "指定唯一的key",
    "firmware.customization.info.encryption.firmware.flash.only.t1": "1. 选择这个选项， 意味着您选择使用一个指定的 KEY 加密所有产品",
    "firmware.customization.info.encryption.firmware.flash.only.t2": "2. 生产中， 我们将加密后的固件烧录到 Flash ，再将 KEY 烧录到 Efuse",
    "firmware.customization.info.encryption.firmware.flash.only.t3": "3. 您需要提供以下文件：",
    "firmware.customization.info.encryption.firmware.flash.only.t3.t1": "1) 用于加密的指定的KEY",
    "firmware.customization.info.encryption.firmware.flash.only.t3.t2": "2) 使用上述KEY加密后的固件。 并且请将加密后的固件 combine 成一个完整固件",
    "firmware.customization.info.encryption.firmware.flash.random": "指定随机生成的key",
    "firmware.customization.info.encryption.firmware.v1": "安全启动V1",
    "firmware.customization.info.encryption.firmware.v2": "安全启动V2",
    "firmware.customization.info.encryption.firmware.v2.key": "pc(s) of keys 数量: ",
    "firmware.customization.info.encryption.firmware.v2.link": "点击获取安全启动功能详情",
    "firmware.customization.info.encryption.firmware.flash.link": "为每个设备使用唯一的随机key加密, 请指定文件数量",
    "firmware.customization.info.unencryption.firmware": "非加密固件",
    "firmware.information.title": "固件信息提供",
    "firmware.information.flash.title": "固件适用的 Flash SPI 设置",
    "firmware.information.flash.config.error": "固件 Flash 设置不能为空",
    "firmware.information.efuse.title": "Efuse 烧录要求",
    "firmware.information.efuse.other.port.help": "请标注其余需要的 Efuse 位和目标烧录值",
    "firmware.information.efuse.other.port.default": "默认值为: 0",
    "firmware.information.name": "固件名称",
    "firmware.information.name.error": "固件名称不能为空",
    "firmware.information.MD5": "固件MD5值",
    "firmware.information.MD5.error": "固件MD5值不能为空",
    "firmware.information.startAddress": "起始烧录地址",
    "firmware.information.startAddress.error": "起始烧录地址不能为空",
    "firmware.information.upLoad": "上传固件文件",
    "firmware.information.upLoad.error": "上传固件文件不能为空",
    "firmware.serial.check.title": "串口校验信息",
    "firmware.serial.universal.serial.port": "通用串口",
    "firmware.serial.universal.serial.port.error": "通用串口不能为空",
    "firmware.serial.self.serial.port": "自定义串口",
    "firmware.serial.self.serial.baud.rate": "串口波特率",
    "firmware.serial.self.serial.baud.rate.error": "串口波特率不能为空",
    "firmware.serial.self.serial.check.character": "串口校验字符",
    "firmware.serial.self.serial.check.character.error": "串口校验字符不能为空",
    "firmware.serial.partitions": "您固件需要加密的 partitions 个数为： ",
    "firmware.mac.title": "定制 MAC",
    "firmware.mac.partitions.write.area": "定制 MAC 写入区域： ",
    "firmware.mac.partitions.write.area.error": "定制 MAC 写入区域不能为空",
    "firmware.mac.partitions.write.area.efuse": "Efuse 写入请使用 IDF 默认接口，默认为 BLK3",
    "firmware.mac.partitions.flash.write.area": "写入 Offset 地址： ",
    "firmware.mac.partitions.flash.write.area.error": "写入 Offset 地址不能为空",
    "firmware.mac.partitions.flash.write.area.mac": "产品分配定制 MAC 地址数： ",
    "firmware.mac.partitions.flash.write.area.serial.port": "串口校验信息: ",
    "firmware.mac.partitions.flash.write.area.serial.port.error": "串口校验信息不能为空",
    "firmware.mac.partitions.flash.write.area.title": "提供连续的 MAC 地址段用于量产",
    "firmware.mac.partitions.start": "起始 MAC 地址: ",
    "firmware.mac.partitions.start.error": "起始 MAC 地址无效",
    "firmware.mac.partitions.end": "结束 MAC 地址: ",
    "firmware.mac.partitions.end.error": "结束 MAC 地址无效",
    "firmware.mac.partitions.info1": "您一共提供了 ",
    "firmware.mac.partitions.info2": " 个 MAC 地址， 一共可用于生产 ",
    "firmware.mac.partitions.info3": " 的产品 ( 约 0.2% 用于生产消耗 )",
    "firmware.mac.partitions.warn": "当您选择定制 MAC 服务， 模组屏蔽盖的二维码内将包含定制 MAC 地址",
    "firmware.label.title": "定制标签",
    "firmware.label.remark": "其他备注信息： ",
    "firmware.label.model": "模组镭射标签:",
    "firmware.label.model.error": "请上传定制模组镭射标签图片",
    "firmware.label.box": "定制外箱标签: ",
    "firmware.label.box.error": "请上传定制外箱标签图片",
    "firmware.label.help": "乐鑫模组包装规格详细信息",
    "firmware.burn.title": "烧录内容定制",
    "firmware.burn.title.context": "每款模组 支持以下位置烧录: ",
    "firmware.burn.hint": "乐鑫支持多种定制内容烧写方案, 请选择合适您的方案, 并按照提示提供对应文件.",
    "firmware.burn.hint.notice": "验证阶段仅需提供三组待烧写数据; 量产时需要按照量产订单量 * ( 1 + 0.2% ) 的比例提供, 多余部分用于正常生成消耗.",
    "firmware.burn.flash.title": "Flash 定制化烧录",
    "firmware.burn.flash.plan": "Flash 烧录方案",
    "firmware.burn.flash.planA": "提供代烧录Bin文件, 由乐鑫代替烧录",
    "firmware.burn.flash.planB.NVS": "提供待烧录数据清单, 由乐鑫生成Bin文件后烧录 ( NVS DATA )",
    "firmware.burn.flash.planB.NO_NVS": "提供待烧录数据清单, 由乐鑫生成Bin文件后烧录 ( 非 NVS 数据 )",

    "firmware.burn.flash.planB": "提供待烧录数据清单, 由乐鑫生成Bin文件后烧录",
    "firmware.burn.flash.planC": "提供烧录脚本",
    "firmware.burn.efuse.title": "eFuse 定制化烧录",
    "firmware.burn.flash.plan.data": "数据大小: 0x",
    "firmware.burn.flash.plan.data.error": "数据大小不能为空",
    "firmware.burn.flash.plan.address": "起始地址: 0x",
    "firmware.burn.flash.plan.address.error": "起始地址不能为空",
    "firmware.burn.flash.plan.output": "烧录成功的串口打印字符串: ",
    "firmware.burn.flash.plan.output.error": "烧录成功的串口打印字符串不能为空",
    "firmware.burn.flash.plan.bin": "bin 文件",
    "firmware.burn.flash.plan.bin.error": "bin 文件不能为空",
    "firmware.burn.flash.file.bin.data.config": "数据格式.csv",
    "firmware.burn.flash.file.bin.data.config.error": "数据格式.csv 不能为空",
    "firmware.burn.flash.file.bin.data.values": "数据值.csv",
    "firmware.burn.flash.file.bin.data.values.error": "数据值.csv 不能为空",
    "firmware.burn.flash.file.bin.data.list": "样例数据.csv",
    "firmware.burn.flash.file.bin.data.list.error": "样例数据.cvs不能为空",
    "firmware.burn.flash.file.bin.data.script": "烧录脚本",
    "firmware.burn.flash.file.bin.data.script.error": "烧录脚本不能为空",
    "firmware.burn.flash.file.bin.data.script.cmd": "烧录命令:",
    "firmware.burn.flash.file.bin.data.script.cmd.error": "烧录命令不能为空",
    "firmware.burn.flash.file.bin.data.result": "烧录结果样例.csv",
    "firmware.burn.flash.file.bin.data.result.error": "烧录结果样例.cvs不能为空",
    "submit.hardware.success": "创建成功, 开始进行下一步填写",
    "submit.hardware.error": "创建失败, 请稍后重试",
    "message.hardware.notfound": "尚未进行硬件选型成功, 请跳转到硬件选型界面",
    "message.service.notfound": "定制生产服务请求失败, 请稍后再试",
    "firmware.information.startAddress.message": "默认(必须)为0X0",
    "firmware.pre.title": "定制 预配置模组需求",
    "firmware.pre.email": "客户PGP邮箱账号: ",
    "firmware.pre.email.error": "客户PGP邮箱账号不能为空",
    "firmware.pre.ca.setting.config.title": "CA (Certificate Authority） 证书颁发机构",
    "firmware.pre.ca.setting.config.type": "预配置方式:",
    "firmware.pre.ca.setting.config.type.error": "预配置方式不能为空",
    "firmware.pre.ca.setting.config.type.custom": "基于客户的可信任 CA 预配置",
    "firmware.pre.ca.setting.config.type.no.custom": "不基于客户的可信任 CA 预配置",
    "firmware.pre.ca.setting.config.type.no.custom.info": "您无需提供CA, 乐鑫会基于我们的默认CA生成设备证书。在出货时，提供模组设备证书清单",
    "firmware.pre.ca.setting.config.type.no.custom.info.PGP": "请传递 已签名CA 和签名使用的private key",
    "firmware.pre.ca.setting.config.type.no.custom.info.YUBIKEY": "请将您的CA置于Yubikey后寄给乐鑫",
    "firmware.pre.ca.setting.config.type.transmission.method.error": "信息传递方式不能为空",
    "firmware.pre.ca.setting.config.type.transmission.method": "信息传递方式:",
    "firmware.pre.ca.setting.config.type.transmission.EFUSE_KEY_BLOCKx": "是否需要为应用固件保留某个EFUSE_KEY_BLOCK ?",
    "firmware.pre.ca.setting.config.type.transmission.EFUSE_KEY_BLOCKx.error": "不能为空",
    "firmware.pre.ca.setting.config.type.device": "对于ESP32-C3 和 ESP32-S3将设备证书保存在自定义的flash或NVS区域 ?",
    "firmware.pre.ca.setting.config.type.Leave": "Leave EFUSE_KEY_BLOCK for custom application",
    "firmware.pre.ca.setting.config.device.certificates": "设备证书",
    "firmware.pre.ca.setting.config.flashing.scheme.options": "烧录方案选择",
    "firmware.pre.ca.setting.config.flashing.scheme.options.espressif": "由乐鑫烧录应用固件: ",
    "firmware.pre.ca.setting.config.flashing.provided": "需提供的资料",
    "firmware.pre.ca.setting.config.flashing.provided.yes": "推荐客户将产品应用固件委托乐鑫烧录，可一次性完成预配置和固件烧录，从而降低后端生产成本和难度.",
    "firmware.pre.ca.setting.config.flashing.provided.no": "自己烧录产品应用固件, 请确保提供本表格数据.",
    "firmware.pre.ca.setting.config.flashing.provided.recommend": "推荐",
    "firmware.pre.ca.setting.config.flashing.provided.required": "必要",
    "firmware.pre.ca.setting.config.flashing.provided.optional": "可选",
    "firmware.pre.ca.setting.config.flashing.provided.no.need": "不需要",
    "index.start": "开始填写",
    "self.check.boot.log": "完整开机串口日志LOG",
    "self.check.boot.file.context": "请确认文件内容包含上文提供的字符串",
    "self.check.boot.efuse.context": "请确保文件内容符合您填写的efuse烧写要求",
    "self.check.button": "自助校验",
    "self.check.result": "校验结果",
    "self.check.return.result": "校验结果",
    "self.check.table.project": "校验项目",
    "self.check.table.file": "校验文件",
    "self.check.table.expected.value": "校验期望值",
    "self.check.table.Md5": "MD5",
    "self.check.table.Md5.info": "(检查预期值是否和实际值一致)",
    "self.check.table.serial.port": "串口打印",
    "self.check.table.serial.port.info": "(检查校验文件是否包含预期字符串)",
    "self.check.table.efuse": "eFuse",
    "self.check.table.efuse.info": "(检查预期值是否与实际值一致)",
    "preselection.hint.mac.context": "使用定制MAC的模型依旧包含乐鑫芯片MAC, 乐鑫芯片自带MAC, 定制MAC是指应用层面定制",
    "preselection.hint.burn.title": "烧录 定制提示",
    "preselection.hint.mac.title": "MAC 定制提示",
    "preselection.hint.burn.context1": "请仔细阅读下文，确认您是否需要定制内容烧录服务：",
    "preselection.hint.burn.context2": "在乐鑫模组量产流程中，定制内容烧写特指：每个模组唯一且不重复的内容，如设备证书，序列号等。量产系统将在确保唯一性的前提下，将这些定制内容分配给每个设备，并完成烧录。",
    "preselection.hint.burn.context3": "对于每个模组相同的部分，为了减少您的定制项目，相应地降低成本，我们建议：",
    "preselection.hint.burn.context4": "如该部分需烧写到flash：请直接combine到定制固件中，按照定制固件的形式烧写",
    "preselection.hint.burn.context5": "如该部分需烧写到eFuse: 请直接注明烧写要求即可，即efuse位和及其期望烧成的目标值",
    "preselection.hint.label.title": "标签 定制提示",
    "preselection.hint.label.context1": "以下为乐鑫模组通用标签, 请审阅评估通用标签是否满足您的需要: ",
    "demand.service.firmware.serial.check.type": "串口类型",
    "demand.service.firmware.serial.check.universal": "通用串口",
    "demand.service.firmware.serial.check.self": "自定义串口",
    "demand.service.firmware.serial.check.error": "串口设定不能为空",
    "demand.service.firmware.serial.check.str": "串口校验-",
    "demand.service.firmware.serial.check.str.help": "请填写串口校验字符串",
    "demand.service.firmware.serial.check.add": "添加串口校验字符串",
    "demand.service.firmware.serial.check.str.size": "串口校验字符串最多添加三条",
    "firmware.customization.info.encryption.firmware.flash.info.link": "点击获取 Flash 加密详情",
    "firmware.customization.info.encryption.firmware.add": "添加固件条目信息",
    "firmware.customization.info.encryption.firmware.max_size": "固件信息条目字最多添加八条",
    "firmware.customization.info.encryption.firmware.min_size": "固件信息条目字最少保留一条",
    "demand.entry.service.burn.efuse.data.burn.info": "确认烧录信息",
    "demand.entry.service.burn.efuse.data.burn.upload": "提供烧录数据",
    "demand.entry.service.label.default.model": "默认标签示意图",
    "self.check.boot.upload.file": "提供示例文件",
    "self.check.boot.upload.file.info": "已提交的数据",
    "self.check.boot.upload.port.hit.firmware": "定制固件阶段",
    "self.check.boot.upload.port.hit.mac": "定制 MAC 阶段",
    "self.check.boot.upload.port.hit.burn": "定制烧录内容阶段",
    "self.check.boot.upload.file.empty": "请上传对应文件, 进行数据校验, 并确保文件内容包含上文提供的字符串",
    "firmware.information.efuse.custom.port.key": "自定义 Efuse位 不能为空",
    "firmware.information.efuse.custom.port.value": "自定义 Efuse值 不能为空",
    "self.check.boot.upload.file.success": "文件上传成功, 请检查校验结果",
    "self.check.boot.upload.file.error": "文件上传失败",
    "self.check.boot.efuse.expect.name": "校验值",
    "self.check.boot.efuse.file.name": "串口名称",
    "self.check.boot.result": "校验结果",
    "self.check.boot.log.expect.name": "校验值",
    "self.check.boot.log.file.name": "日志LOG",
    "self.check.boot.log.check.sum": "文件上传成功, 开始总体检验",
    "self.check.boot.log.check.file": "校验失败, 无法创建"
  }
};

export default i18n;
