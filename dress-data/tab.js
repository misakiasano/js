    var LEIHAUOLI = LEIHAUOLI || {};
    LEIHAUOLI.PAGE1 = {};
    LEIHAUOLI.PAGE1.tabContents = {
        init : function(){
            this.bindEvent();
            this.setParameters();
        },
        
        setParameters : function(){
            this.$containerLi = $('.tab-container').find('li');
            this.$selectorLi = $('.tab-selector').find('li');
        },
        
        bindEvent : function(){
            var myself = this;
            this.$tabFind = $('.tab-selector').find('a');
            this.$tabFind.each(function(index){
                var $element = $(this);
                var tabAttr = $element.attr('href');
                var containerAttr = $(tabAttr);
                $element.on('click',function(event){
                    event.preventDefault();
                    myself.$containerLi.removeClass('selected');
                    myself.$selectorLi.removeClass('selected');
                    myself.$selectorLi.eq(index).addClass('selected');
                    containerAttr.addClass('selected');
                });
                
            });    
        }
        
  
        
    };
    
    
    
    
$(function(){
    LEIHAUOLI.PAGE1.tabContents.init();
});