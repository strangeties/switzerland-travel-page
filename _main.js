kNumLinks = 10;
kMenuItemHeight = 60;
kMenuHeight = kNumLinks * kMenuItemHeight + kMenuItemHeight / 3;
kErr = 5;

const kStories = ['prelude', 'anticipation', 'second_impressions', 'wwjd', 'small_connections', 'small_discoveries', 'small_moments', 'the_roots_hat', 'journeys_end'];

is_hovering_over_button_ = {};
kStories.forEach(function(item, index) {
                    is_hovering_over_button_[item] = false;
                 });

function includeHtml(cb) {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    elmnt.removeAttribute("w3-include-html");
                    w3.includeHTML(cb);
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
    if (cb) cb();
};

function setMenuVisibilityToHidden(menu_style) {
    menu_style.visibility = 'hidden';
    menu_style.height = 0;
    menu_style.overflow = 'hidden';
}

function setMenuVisibilityToVisible(menu_style) {
    menu_style.visibility = 'visible';
    menu_style.height = kMenuHeight + 'px';
    menu_style.overflow = 'scroll';
}

function menuIsVisible(menu_style) {
    return menu_style.visibility === 'visible';
}

function toggleMenuVisibility(menu_style, hat_style)
{
    if (menuIsVisible(menu_style)) {
        setMenuVisibilityToHidden(menu_style);
        hat_style.visibility = 'hidden';
    } else {
        setMenuVisibilityToVisible(menu_style);
        hat_style.visibility = 'visible';
    }
}

function isInView(id) {
    elem = document.getElementById(id);
    bounding = elem.getBoundingClientRect();
    return bounding.bottom - kErr > 0 && bounding.top + kErr < (window.innerHeight || document.documentElement.clientHeight) && bounding.right - kErr > 0 && bounding.left + kErr < (window.innerWidth || document.documentElement.clientWidth);
}

function highlight(style) {
    style['background-color'] = 'rgb(255,255,255,0.4)';
}

function unhighlight(style) {
    style['background-color'] = 'rgb(255,255,255,0)';
}

function highlightButton(id) {
    highlight( document.getElementById(id + "_button").style);

}

function unhighlightButton(id) {
    unhighlight( document.getElementById(id + "_button").style);

}

function highlightButtonIfStoryIsInView(id) {
    if (isInView(id)) {
        highlightButton(id)
    }
}

function unHighlightButtonIfItsUnhoveredAndStoryIsOutOfView(id) {
    if (!is_hovering_over_button_[id] && !isInView(id)) {
        unhighlightButton(id);
    }
}

window.addEventListener('click', function(e){
                        hamburger = document.getElementById("hamburger");
                        menu = document.getElementById("menu");
                        hat = document.getElementById("hat");
                        if (hamburger.contains(e.target)) {
                            toggleMenuVisibility(menu.style, hat.style);
                        } else if (!menu.contains(e.target) && menuIsVisible(menu.style)) {                        setMenuVisibilityToHidden(menu.style);
                            hat.style.visibility = 'hidden';
                        }});

window.addEventListener('scroll', function(){
                        kStories.forEach(function(item, index) {
                                         if (isInView(item)) {
                                            highlightButton(item);
                                         } else if (!is_hovering_over_button_[item]) {
                                            unhighlightButton(item);
                                         }
                                        });
                        });

function resetMenuMaxHeight() {
    style = document.getElementById("menu").style;
    style['max-height'] = (window.innerHeight - 15) + 'px';
}

window.addEventListener("resize", function(){ resetMenuMaxHeight();});

document.addEventListener("DOMContentLoaded", function(){
                          includeHtml();
                          
                          resetMenuMaxHeight();
                          
                          kStories.forEach(function(item, index) {
                                          elem = document.getElementById(item + '_button');
                                          elem.addEventListener("mouseover",
                                                                function() {
                                                                    highlightButton(item);
                                                                    is_hovering_over_button_[item] = true;
                                                                });
                                          elem.addEventListener("mouseout",
                                                                function() {
                                                                    if (!isInView(item)) {
                                                                        unhighlightButton(item);
                                                                    }
                                                                    is_hovering_over_button_[item] = false;
                                                                });
                                          });
                          });

