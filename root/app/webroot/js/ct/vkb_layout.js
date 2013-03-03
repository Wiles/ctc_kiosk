window.kb_props = {
	'container' : null, 
	'visibility' : { 
		'initialStatus' : 'hidden', 
		'status' : 'hidden', 
		'show' : function() {
			//undebug('show');
			var mykb = window.kb_props.container;
			var kb_height = mykb.get(0).offsetHeight;
			var kb_top = mykb.get(0).offsetTop;
			var initial_top = kb_top+kb_height;
			mykb.css({'top':initial_top, 'visibility':'visible'}).animate({'top':kb_top}, 600, 'swing');
			$('#uHideVkbIcn').unbind('click').bind('click', uHideVkb);
		}, 
		'hide' : function() {
			var kbp = window.kb_props;
			if (kbp.container) {
				kbp.container.css({'visibility':'hidden'});
				kbp.visibility.status = 'hidden';
			}
		}
	}
};
$(document).bind('xhrloading', uHideVkb);

function uHideVkb() {
	window.kb_props.visibility.hide();
}

window.kb_layout = [ 
	[
		{type:'letter', values:['q','!']},
		{type:'letter', values:['w','\"']},
		{type:'letter', values:['e','&pound;']},
		{type:'letter', values:['r','$']},
		{type:'letter', values:['t','%']},
		{type:'letter', values:['y','^']},
		{type:'letter', values:['u','&amp;']},
		{type:'letter', values:['i','*']},
		{type:'letter', values:['o','(']},
		{type:'letter', values:['p',')']}, 
		{type:'fn', values:['delete'], labels:['backspace']},
		{type:'number', values:['1'], 'id':'one'}, 
		{type:'number', values:['2']}, 
		{type:'number', values:['3']}
	],
	[
		{type:'letter', values:['a','&lt;']},
		{type:'letter', values:['s','|']},
		{type:'letter', values:['d','\'']},
		{type:'letter', values:['f','&euro;']},
		{type:'letter', values:['g','#']},
		{type:'letter', values:['h','~']},
		{type:'letter', values:['j','+']},
		{type:'letter', values:['k','_']},
		{type:'letter', values:['l','\\']},
		{type:'symbol', values:['@']},
		{type:'symbol', values:['-']},
		{type:'number', values:['4'], 'id':'four'}, 
		{type:'number', values:['5']}, 
		{type:'number', values:['6']}
	],
	[
		{type:'letter', values:['z','&gt;']},
		{type:'letter', values:['x','[']},
		{type:'letter', values:['c',']']},
		{type:'letter', values:['v','{']},
		{type:'letter', values:['b','}']},
		{type:'letter', values:['n',':']},
		{type:'letter', values:['m',';']},
		{type:'symbol', values:[',']},
		{type:'symbol', values:['.']},
		{type:'symbol', values:['/']}, 
		{type:'number', values:['7'], 'id':'seven'}, 
		{type:'number', values:['8']}, 
		{type:'number', values:['9']}
	],
	[
		{type:'fn', values:['shift'], labels:['UPPER CASE']},
		{type:'symbol', values:[' '], labels:['space']},
		{type:'fn', values:['abc'], labels:['?#%', 'Abc']},
		{type:'number', values:['0'], 'id':'zero'},
		{type:'fn', values:['<img src="images/kbIcn.png" id="uHideVkbIcn"/>'], 'id':'uHideVkb'}
	]
];