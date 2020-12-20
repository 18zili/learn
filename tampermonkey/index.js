const delay = (time = 3) =>
	new Promise((resolve) => setTimeout(() => resolve(), time * 1000));

function go(path) {
	window.location.href = 'http://learn.open.com.cn/' + path;
}

function login() {
	GM_log('正在登录...');
	$('#username').val('NK45000lizhuang2009');
	$('#pwd').val('lizhuangzhuang2009');
	$('#loginbtn').click();
}

function toNavigation() {
	GM_log('正在跳转到我的课程页面...');
	$('#leftpartnav div:eq(2) a')[0].click();
}

function getStudentList() {
	const result = [];
	$('#tableList_0')
		.children()
		.each(function () {
			const name = $(this)
				.find('.middleCont ul li.smlConto a span')
				.text();
			const process = $(this)
				.find('.middleCont ul li.smlContfi ul li.percentage')
				.text()
				.split(' ')[0];
			const path = $(this)
				.find('.middleCont ul li.smlConto a')
				.attr('href');

			result.push({ name, process, path });
		});
	return result;
}

$(async () => {
	await delay();

	const href = window.location.href;
	if (href.includes('/Account/Login')) {
		return login();
	}

	if (href.includes('/StudentCenter/Index')) {
		return toNavigation();
	}

	if (href.includes('/StudentCenter/MyLearning/MyCourse')) {
		GM_log('正在获取全部课程进度...');
		await delay(10);
		const studentList = getStudentList();
		const myStudentHref = window.location.href;
		for (let i = 0; i < studentList.length; i++) {
			const { name, process, path } = studentList[i];
			GM_log(`课程：${name} 完成度：${process}%`);
			if (process == 100) continue;
			GM_log(`正在学习课程：${name}`);
			go(path);
			await delay(10);
			await delay(999999999999999999999);
		}
	}
});
