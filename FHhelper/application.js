var options = { 
	h:8,
	m:25,
	uh:20,
	um:4,
	ssun:false,
	sat:false,
	fri:true,
	thur:true,
	wed:true,
	tues:true,
	mon:true,
	sIn:true,
	sOut:true,
};
// 从 storage 中读取配置，如果没有配置，则初始化为默认值
function initOptions(callback) {
	chrome.storage.sync.get(null, function(data) {
		$.extend(options, data);
		chrome.storage.sync.set(options, function(data) {
			console.log("初始化完成")
		})
		callback && callback();
	});
}
// 监听设置项的变化
chrome.storage.onChanged.addListener(function(changes) {
	for (var name in changes) {
		var change = changes[name];
		options[name] = change.newValue;
	}
});