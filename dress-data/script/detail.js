var LEIHAUOLI = LEIHAUOLI || {};
LEIHAUOLI.PAGE2 = {};
LEIHAUOLI.PAGE2.carousel = {
    init : function(){
        this.setParameters();
        this.bindEvent();
    },
    setParameters : function(){
        this.$btnNext = $('.next');
        this.$btnPrevious = $('.previous');
        this.$container = $('.container');
        this.$img = this.$container.find('img');
        this.imgWidth = this.$img.width();
        this.$indicator = $('.indicator-wrapper').find('li');
        this.$containerLength = this.$container.find('li').length;
        this.lastPage = this.$containerLength-1;
        this.currentIndex = 0;
        this.$indicator = $('.indicator-wrapper').find('li');
    },  
    
    slideToPrevious : function(){
        if(this.$container.is('animated')){
            return;
        }
        if(this.currentIndex == 0){
            return;
        }else{
            this.currentIndex--;
        }
        this.$container.animate({left:this.currentIndex*this.imgWidth*-1},300);
        this.setIndicator();
        this.setArrowPrevious();
   
    },
    
    slideToNext : function(){
        if(this.$container.is('animated')){
            return;  
        }
        if(this.currentIndex == this.lastPage){
            return;
        }else{
            this.currentIndex++;
        }
        
        this.$container.animate({left:this.currentIndex*this.imgWidth*-1},300);
        this.setIndicator();
        this.setArrowNext();

    },
    
    setIndicator: function() {
        var myself = this;
        this.$indicator.each(function(i){
            var $elemens = $(this);
            if(i == myself.currentIndex){
                $elemens.addClass('current');
            }else{
                $elemens.removeClass('current');
            }
        });
    },
    
    setArrowNext: function(){
        if(this.currentIndex == this.lastPage){
            $('.next').addClass('disabled');
        }else{
            $('.previous').removeClass('disabled');
        } 
    },
    
    
    setArrowPrevious:function(){
        if(this.currentIndex == 0){
            $('.previous').addClass('disabled');
        }else{
            $('.next').removeClass('disabled');
        } 
    },
   
    bindEvent : function(){
        var myself = this;
        this.$btnNext.on('click',this.slideToNext.bind(this));
        this.$btnPrevious.on('click',this.slideToPrevious.bind(this)); 
        
        this.$indicator.each(function(index){
        var $self = $(this);
            $self.on('click',function(event){
                event.preventDefault();
                myself.currentIndex = index;
                myself.$container.animate({left:myself.currentIndex*myself.imgWidth*-1},300);
                myself.$indicator.removeClass('current');
                $self.addClass('current');
                myself.$btnPrevious.removeClass('disabled');
                myself.$btnNext.removeClass('disabled');
                
                if(myself.currentIndex == myself.lastPage){
                    $('.next').addClass('disabled');
                }
                if(myself.currentIndex == 0){
                    $('.previous').addClass('disabled');
                }

            });
        });
    }
};
$(function(){
    LEIHAUOLI.PAGE2.carousel.init();
});
 