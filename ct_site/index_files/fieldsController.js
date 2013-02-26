( function () {

	/**
	 * @constructor
	*/
	function UnFieldsController(form) {
		var fields = form.find('#un_form_fields'); // fields container 
		if (fields.data('ready'))
			return;
		
		var inputs = fields.find('.un_form_field').find('input[type="text"], input[type="password"]');
		
		var selectField = function() {
			if( !($(this).attr('disabled')) ){
				//set attributes with DOM method instead of jquery for better performance, IE too slow.
			    $(this).closest('.un_form_field').addClass('selected').get(0).setAttribute('vfocus','true');
			    
			    var setHeight = fields.data('fieldscontroller-height');
			    //undebug('setHeight: ' + fields.attr('fieldscontroller-height'));
			    if (fields.attr('data-fieldscontroller-height')) {
			        fields.css({'overflow':'hidden', 'height':setHeight});
			        fields.removeAttr('data-fieldscontroller-height');
			        $(document.createElement('div'))
			        		.css({'height':'80px', 'width':1})
			        		.appendTo(fields); // append a spacer
			    }
			}
		};
		
		var unSelectField = function() {
		    var parent = $(this).closest('.un_form_field');
			//set attributes with DOM method instead of jquery for better performance, IE too slow.
			parent[0].setAttribute('vfocus','false');
		    //undebug('blur of t: ' + t);
		    setTimeout( function() {
		        //undebug('timeout check for focus');
		        if ( parent[0].getAttribute('vfocus') == 'false') {
		            //undebug('remove vfocus attr');
		            parent.removeClass('selected');
		        }
		    }, '250');
		};
		
		inputs.focus( selectField ).blur( unSelectField );
		fields.data('ready', true);
	}
	window['FieldsController'] = function(f) {
		var o = new UnFieldsController(f);
	}
}());