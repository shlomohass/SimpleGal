/* ------------------------------------------------------------------------------------------------------------------------------ 
 * Simple Gallery - SimGal
 * Simple jQuery plugin to create quick and easy galleries - Light weight and easy to modify.
 * Copyright (c) 219 - SikTec, Inc. All Rights Reserved.
 * Author : Shlomo Hassid, Shlomohassid@gmail.com
 * Created : Feb, 2020.
 * Version : 1.0.1
 * ------------------------------------------------------------------------------------------------------------------------------
 * Example Usage:
 * <div id="simgal1" class="simgal">
 *      <ul class="sg_display">
 *          <li data-link="1" data-image="1.jpg" class="sg_fadeIn"></li>
 *          <li data-link="2" data-image="2.jpg"></li>
 *      </ul>
 *      <ul class="sg_thumbs">
 *          <li data-link="1" data-image="1.jpg" class="sg_fadeIn"></li>
 *          <li data-link="2" data-image="2.jpg"></li>
 *      </ul>
 * </div>
 * 
 * $("#simgal1-element").simGal({ 
 *    width : 600, 
 *    height : 550, 
 *    mainShowPadding : 35,
 *    server : "http://bla.net/bla_img/",  //optional for nicer code :)
 *    animDuration : { main : "0.5s", thumb : "0.15s" },
 *    thumbsSizing : "auto" // { width : 90, height : 90, paddingLeft : 30, paddingRight : 30 }
 * });
 */

// simgal Obj:
;(function($, window, document, undefined) {
  var pluginName = 'simGal',
    defaults = {
      width: 600,
      height: 400,
      mainShowPadding: 15,
      thumbsSizing: "auto", // { width : 90, height : 90, marginLeft : 30, marginRight : 30 }
      animDuration: {
        main: "0.5s",
        thumb: "0.15s"
      },
      server: ""
    },
    struct = {
      ele_main: null,
      ele_show_container: null,
      ele_show_images: null,
      ele_thumb_container: null,
      ele_thumb_images: null
    };
  // The plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.$element = $(element);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._struct = struct;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype.init = function() {
    let mainThis = this;
    //Create struct:
    this._struct.ele_main = this.$element;
    this._struct.ele_show_container = this.$element.find(".sg_display");
    this._struct.ele_show_images = this._struct.ele_show_container.find("li");
    this._struct.ele_thumb_container = this.$element.find(".sg_thumbs");
    this._struct.ele_thumb_images = this.$element.find(".sg_thumbs li");
    // 
    //Set size:
    this._struct.ele_main.css({
      width: this.options.width
    });
    this._struct.ele_show_container.css({
      height: this.options.height,
      padding: this.options.mainShowPadding
    });
    this._struct.ele_show_images.css({
      width: this.options.width - 2 - this.options.mainShowPadding * 2,
      height: this.options.height - 2 - this.options.mainShowPadding * 2,
      transitionDuration: this.options.animDuration.main
    });
    let thumbSize = {
      width: (this.options.thumbsSizing == "auto") ?
        this.options.width / this._struct.ele_thumb_images.length - 30 :
        this.options.thumbsSizing.width - this.options.thumbsSizing.marginLeft + this.options.thumbsSizing.marginRight,
      height: (this.options.thumbsSizing == "auto") ?
        this.options.width / this._struct.ele_thumb_images.length - 30 :
        this.options.thumbsSizing.height,
      marginLeft: (this.options.thumbsSizing == "auto") ?
        15 :
        this.options.thumbsSizing.marginLeft,
      marginRight: (this.options.thumbsSizing == "auto") ?
        15 :
        this.options.thumbsSizing.marginRight,
      transitionDuration: this.options.animDuration.thumb
    }
    this._struct.ele_thumb_images.css(thumbSize);
    //Load images:
    this._struct.ele_show_images.each(function(i, ele) {
      $(ele).css({
        backgroundImage: "url(" + mainThis.options.server + $(ele).data("image") + ")"
      });
    });
    this._struct.ele_thumb_images.each(function(i, ele) {
      $(ele).css({
        backgroundImage: "url(" + mainThis.options.server + $(ele).data("image") + ")"
      });
    });
    //Attach click to switch images
    this._struct.ele_thumb_images.on("click", function(e) {
      e.preventDefault();
      if ($(this).hasClass("sg_fadeIn")) return;
      mainThis._struct.ele_thumb_images.removeClass("sg_fadeIn");
      mainThis._struct.ele_show_images.removeClass("sg_fadeIn");
      $(this).addClass("sg_fadeIn");
      mainThis._struct.ele_show_container.find("li[data-link=" + $(this).data("link") + "]").addClass("sg_fadeIn");
    });

  };
  //$( "li" ).animate({opacity: .5, height: "50%"});
  // A really lightweight plugin wrapper around the constructor, 
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName,
          new Plugin(this, options));
      }
    });
  }

})(jQuery, window, document);
