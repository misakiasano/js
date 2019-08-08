var LEIHAUOLI = LEIHAUOLI || {};
LEIHAUOLI.PAGE3 = {};
LEIHAUOLI.PAGE3.carousel = {
    init : function(){
        this.setParameters();
        this.bindEvent();
    },
    
    setParameters : function(){
        var myself = this;
        this.$btnNext = $('.next');
        this.$btnPrevious = $('.previous');
        this.$container = $('.container');
        this.$img = this.$container.find('img');
        this.imgWidth = this.$img.width();
        this.$containerLength = this.$container.find('li').length;
        this.lastPage = this.$containerLength-5;
        this.currentIndex = 0;
        this.whitespace = 10;
        var divisible = this.$containerLength / 3; 
        this.divisible = Math.floor(divisible) 
        this.remainder = this.$containerLength % 3; 
        this.$indicator = $('.indicator-wrapper').find('a');
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
                var left = myself.$container.position().left;
                var num = myself.currentIndex;
                myself.currentIndex = index;
                if(myself.currentIndex == myself.lastPage && myself.currentIndex == num){
                    return;
                }
                
                    if(num == index){
                        return;
                    }
                
                if(myself.currentIndex == 0){
                    myself.$container.animate({left:0},300);    
                }
             
                if(0 < myself.currentIndex && myself.currentIndex <= myself.divisible -1){
                    if(num < myself.currentIndex){
                        myself.$container.animate({left:left - (myself.imgWidth*3 + myself.whitespace*3)},300);    
                    }else if (num >= myself.currentIndex){
                         myself.$container.animate({left:left + (myself.imgWidth*3 + myself.whitespace*3)},300);      
                    }
                }
                
                if(myself.currentIndex == myself.divisible){
                    myself.$container.animate({left:left - (myself.imgWidth*1 + myself.whitespace*1)},300);         
                }
                
                myself.$indicator.removeClass('current');
                $self.addClass('current');
                $('.previous').removeClass('disabled');
                $('.next').removeClass('disabled');
                if(myself.currentIndex == myself.lastPage){
                    $('.next').addClass('disabled');
                }
                if(myself.currentIndex == 0){
                    $('.previous').addClass('disabled');
                }

            });
        });
    },
    
    slideToPrevious : function(event){
        event.preventDefault();
        if(this.$container.is('animated')){
            return;
        }
        if(this.currentIndex == 0){
            return;
        }else{
            this.currentIndex--;
        }
       
        if(this.currentIndex == this.remainder){
            this.$container.animate({left:this.currentIndex*(this.imgWidth*this.remainder+this.whitespace*this.remainder)*-1},300)
        }else if(this.currentIndex == 0){
            this.$container.animate({left:0},300); 
        }
        this.setIndicator();
        this.setArrowPrevious();
    },
    
    slideToNext : function(event){
        event.preventDefault();
        if(this.$container.is('animated')){
            return;  
        }
        if(this.currentIndex == this.lastPage){
            return;
        }else{
            this.currentIndex++;
        }
        
        if(this.currentIndex == this.divisible){
            this.$container.animate({left:this.currentIndex*(this.whitespace*this.divisible + this.imgWidth*this.divisible)*-1},300);  
        }else if(this.currentIndex == this.remainder){
            this.$container.animate({left:this.currentIndex*(this.imgWidth*3+this.whitespace*3)*-1},300);   
        }
        this.setIndicator();
        this.setArrowNext();
    }
    
};

$(function(){
    LEIHAUOLI.PAGE3.carousel.init();
});
 