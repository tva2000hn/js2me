js2me.createClass({
	_init$$V: function () {
		this.threadId = js2me.threads.length;
		js2me.threads.push(this);
		this.timers = [];
	},
	$schedule$Ljava_util_TimerTask_J$V: function (task, delay) {
		task.executing = true;
		var timer = this;
		task.timer = setTimeout(function () {
			task.executing = false;
			task.$run$$V();
		}, delay.toInt());
		this.timers.push(task.timer);
	},
	$schedule$Ljava_util_TimerTask_JJ$V: function (task, delay, interval) {
		task.executing = true;
		var timer = this;
		task.timer = setInterval(function () {
			js2me.currentThread = timer.threadId;
			if (js2me.restoreStack[timer.threadId] && js2me.restoreStack[timer.threadId].length > 0) {
				return;
			}
			clearTimeout(task.timer);
			if (interval) {
				task.timer = setInterval(function () {
					js2me.currentThread = timer.threadId;
					if (js2me.restoreStack[timer.threadId] && js2me.restoreStack[timer.threadId].length > 0) {
						return;
					}
					task.$run$$V();
				}, interval.toInt());
				timer.timers.push(task.timer);
			}
			task.$run$$V();
		}, delay.toInt());
		this.timers.push(task.timer);
	},
	$cancel$$V: function () {
		for (var i = 0; i < this.timers.length; i++) {
			clearTimeout(this.timers[i]);
		}
	},
	package: 'javaRoot.$java.$util',
	name: '$Timer'
});

