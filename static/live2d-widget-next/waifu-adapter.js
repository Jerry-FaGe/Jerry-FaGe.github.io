(function () {
	function syncLive2DCheckbox(checked) {
		const checkbox = document.getElementById('live2d_on');
		if (checkbox) checkbox.checked = checked;
	}

	document.addEventListener('click', event => {
		if (event.target.closest('#waifu-tool-quit')) {
			syncLive2DCheckbox(false);
		} else if (event.target.closest('#waifu-toggle')) {
			syncLive2DCheckbox(true);
		}
	});

	window.addEventListener('storage', event => {
		if (event.key === 'waifu-display') syncLive2DCheckbox(!event.newValue);
	});
})();
