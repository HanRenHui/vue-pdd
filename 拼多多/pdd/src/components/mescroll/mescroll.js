/*
 * mescroll -- 精致的下拉刷新和上拉加载js框架  ( a great JS framework for pull-refresh and pull-up-loading )
 * version 1.2.3
 *
 * 您如果在vue,angular等环境中,因作用域的问题未能正常引入或初始化Mescroll对象,则可引用mescroll.m.js;
 * mescroll.m.js去掉了mescroll.min.js套的一层模块规范的代码
 * 因为没有闭包限制作用域,所以能解决某些情况下引用mescroll.min.js报'Mescroll' undefined的问题
 */
function MeScroll(a, b) {
  this.beActivated = true;
  this.isScrollBody = (!a || a === "body");
  this.scrollDom = this.isScrollBody ? document.body: document.getElementById(a);
  this.options = b || {};
  this.isDownScrolling = false;
  this.isUpScrolling = false;
  this.initDownScroll();
  this.initUpScroll();
  let c = this;
  setTimeout(function() {
      if (c.optDown.auto) {
        if (c.optDown.autoShowLoading) {
          c.triggerDownScroll()
        } else {
          c.optDown.callback && c.optDown.callback(c)
        }
      }
      c.optUp.auto && c.triggerUpScroll()
    },
    30)
}
MeScroll.prototype.extendDownScroll = function(b) {
  let a = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  MeScroll.extend(b, {
    use: true,
    auto: true,
    autoShowLoading: false,
    isLock: false,
    isBoth: false,
    offset: 80,
    outOffsetRate: 0.2,
    bottomOffset: 20,
    minAngle: 45,
    mustToTop: !a,
    hardwareClass: "mescroll-hardware",
    warpId: null,
    warpClass: "mescroll-downwarp",
    resetClass: "mescroll-downwarp-reset",
    htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>',
    inited: function(d, c) {
      d.downTipDom = c.getElementsByClassName("downwarp-tip")[0];
      d.downProgressDom = c.getElementsByClassName("downwarp-progress")[0]
    },
    inOffset: function(c) {
      if (c.downTipDom) {
        c.downTipDom.innerHTML = "下拉刷新"
      }
      if (c.downProgressDom) {
        c.downProgressDom.classList.remove("mescroll-rotate")
      }
    },
    outOffset: function(c) {
      if (c.downTipDom) {
        c.downTipDom.innerHTML = "释放更新"
      }
    },
    onMoving: function(d, f, c) {
      if (d.downProgressDom) {
        let e = 360 * f;
        d.downProgressDom.style.webkitTransform = "rotate(" + e + "deg)";
        d.downProgressDom.style.transform = "rotate(" + e + "deg)"
      }
    },
    beforeLoading: function(d, c) {
      return false
    },
    showLoading: function(c) {
      if (c.downTipDom) {
        c.downTipDom.innerHTML = "加载中 ..."
      }
      if (c.downProgressDom) {
        c.downProgressDom.classList.add("mescroll-rotate")
      }
    },
    callback: function(c) {
      c.resetUpScroll()
    }
  })
};
MeScroll.prototype.extendUpScroll = function(a) {
  let b = typeof window.orientation == "undefined";
  MeScroll.extend(a, {
    use: true,
    auto: false,
    isLock: false,
    isBoth: false,
    callback: null,
    page: {
      num: 0,
      size: 10,
      time: null
    },
    noMoreSize: 5,
    offset: 100,
    toTop: {
      src: null,
      offset: 1000,
      warpClass: "mescroll-totop",
      showClass: "mescroll-fade-in",
      hideClass: "mescroll-fade-out",
      duration: 300
    },
    loadFull: {
      use: false,
      delay: 500
    },
    empty: {
      warpId: null,
      icon: null,
      tip: "暂无相关数据~",
      btntext: "",
      btnClick: null
    },
    clearId: null,
    clearEmptyId: null,
    hardwareClass: "mescroll-hardware",
    warpId: null,
    warpClass: "mescroll-upwarp",
    htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>',
    htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
    inited: function(c, d) {},
    showLoading: function(c, d) {
      d.innerHTML = c.optUp.htmlLoading
    },
    showNoMore: function(c, d) {
      d.innerHTML = c.optUp.htmlNodata
    },
    onScroll: null,
    scrollbar: {
      use: b,
      barClass: "mescroll-bar"
    }
  })
};
MeScroll.extend = function(b, a) {
  if (!b) {
    return a
  }
  for (let key in a) {
    if (b[key] == null) {
      b[key] = a[key]
    } else {
      if (typeof b[key] == "object") {
        MeScroll.extend(b[key], a[key])
      }
    }
  }
  return b
};
MeScroll.prototype.initDownScroll = function() {
  let a = this;
  a.optDown = a.options.down || {};
  if (a.optDown.use == false) {
    return
  }
  a.extendDownScroll(a.optDown);
  a.downwarp = document.createElement("div");
  a.downwarp.className = a.optDown.warpClass;
  a.downwarp.innerHTML = '<div class="downwarp-content">' + a.optDown.htmlContent + "</div>";
  a.downparent = a.optDown.warpId ? document.getElementById(a.optDown.warpId) : a.scrollDom;
  if (a.optDown.warpId) {
    a.downparent.appendChild(a.downwarp)
  } else {
    a.downparent.insertBefore(a.downwarp, a.scrollDom.firstChild)
  }
  a.touchstartEvent = function(b) {
    if (a.isScrollTo) {
      b.preventDefault()
    }
    a.startTop = a.getScrollTop();
    a.endTouchmove = false;
    a.maxTouchmoveY = a.getBodyHeight() - a.optDown.bottomOffset;
    if (a.optDown.mustToTop) {
      a.startY = b.touches ? b.touches[0].pageY: b.clientY
    }
  };
  a.scrollDom.addEventListener("touchstart", a.touchstartEvent);
  a.scrollDom.addEventListener("mousedown", a.touchstartEvent);
  a.touchmoveEvent = function(i) {
    let d = a.getScrollTop();
    if (a.startTop != null && d <= 0 && !a.isDownScrolling && (!a.isUpScrolling || (a.isUpScrolling && a.optUp.isBoth)) && !a.optDown.isLock && !a.endTouchmove) {
      if (a.optDown.mustToTop && a.startTop > 0) {
        return
      }
      let c = i.touches ? i.touches[0].pageX: i.clientX;
      let b = i.touches ? i.touches[0].pageY: i.clientY;
      if (!a.preX) {
        a.preX = c
      }
      if (!a.preY) {
        a.preY = b
      }
      let l = Math.abs(a.preX - c);
      let k = Math.abs(a.preY - b);
      let j = Math.sqrt(l * l + k * k);
      let m = b - a.preY;
      a.preX = c;
      a.preY = b;
      if (j != 0) {
        let g = Math.asin(k / j) / Math.PI * 180;
        if (g < a.optDown.minAngle) {
          return
        }
      }
      if (!a.startY && !a.optDown.mustToTop) {
        a.startY = b
      }
      let f = b - a.startY - d;
      if (f > 0) {
        i.preventDefault();
        if (a.maxTouchmoveY > 0 && b >= a.maxTouchmoveY) {
          a.endTouchmove = true;
          a.touchendEvent();
          return
        }
        if (!a.downHight) {
          a.downHight = 0
        }
        if (a.downHight < a.optDown.offset) {
          if (a.movetype != 1) {
            a.movetype = 1;
            a.optDown.inOffset(a);
            a.downwarp.classList.remove(a.optDown.resetClass);
            a.scrollDom.classList.add(a.optDown.hardwareClass);
            a.scrollDom.style.webkitOverflowScrolling = "auto";
            a.isMoveDown = true
          }
          a.downHight += m
        } else {
          if (a.movetype != 2) {
            a.movetype = 2;
            a.optDown.outOffset(a);
            a.downwarp.classList.remove(a.optDown.resetClass);
            a.scrollDom.classList.add(a.optDown.hardwareClass);
            a.scrollDom.style.webkitOverflowScrolling = "auto";
            a.isMoveDown = true
          }
          if (m > 0) {
            a.downHight += m * a.optDown.outOffsetRate
          } else {
            a.downHight += m
          }
        }
        a.downwarp.style.height = a.downHight + "px";
        let h = a.downHight / a.optDown.offset;
        a.optDown.onMoving(a, h, a.downHight)
      }
    }
  };
  a.scrollDom.addEventListener("touchmove", a.touchmoveEvent);
  a.scrollDom.addEventListener("mousemove", a.touchmoveEvent);
  a.touchendEvent = function() {
    if (a.isMoveDown) {
      if (a.downHight >= a.optDown.offset) {
        a.triggerDownScroll()
      } else {
        a.downwarp.classList.add(a.optDown.resetClass);
        a.downHight = 0;
        a.downwarp.style.height = 0
      }
      a.scrollDom.style.webkitOverflowScrolling = "touch";
      a.scrollDom.classList.remove(a.optDown.hardwareClass);
      a.movetype = 0;
      a.isMoveDown = false
    }
    a.startY = 0;
    a.preX = 0;
    a.preY = 0;
    a.startTop = null
  };
  a.scrollDom.addEventListener("touchend", a.touchendEvent);
  a.scrollDom.addEventListener("mouseup", a.touchendEvent);
  a.scrollDom.addEventListener("mouseleave", a.touchendEvent);
  setTimeout(function() {
      a.optDown.inited(a, a.downwarp)
    },
    0)
};
MeScroll.prototype.triggerDownScroll = function() {
  if (!this.optDown.beforeLoading(this, this.downwarp)) {
    this.showDownScroll();
    this.optDown.callback && this.optDown.callback(this)
  }
};
MeScroll.prototype.showDownScroll = function() {
  this.isDownScrolling = true;
  this.optDown.showLoading(this);
  this.downHight = this.optDown.offset;
  this.downwarp.classList.add(this.optDown.resetClass);
  this.downwarp.style.height = this.optDown.offset + "px"
};
MeScroll.prototype.endDownScroll = function() {
  this.downHight = 0;
  this.downwarp.style.height = 0;
  this.isDownScrolling = false
};
MeScroll.prototype.lockDownScroll = function(a) {
  if (a == null) {
    a = true
  }
  this.optDown.isLock = a
};
MeScroll.prototype.initUpScroll = function() {
  let a = this;
  a.optUp = a.options.up || {
      use: false
    };
  if (a.optUp.use == false) {
    return
  }
  a.extendUpScroll(a.optUp);
  if (a.optUp.scrollbar.use) {
    a.scrollDom.classList.add(a.optUp.scrollbar.barClass)
  }
  a.upwarp = document.createElement("div");
  a.upwarp.className = a.optUp.warpClass;
  a.upparent = a.optUp.warpId ? document.getElementById(a.optUp.warpId) : a.scrollDom;
  a.upparent.appendChild(a.upwarp);
  a.preScrollY = 0;
  a.scrollEvent = function() {
    let d = a.getScrollTop();
    let c = d - a.preScrollY > 0;
    a.preScrollY = d;
    if (!a.isUpScrolling && (!a.isDownScrolling || (a.isDownScrolling && a.optDown.isBoth))) {
      if (!a.optUp.isLock) {
        let b = a.getScrollHeight() - a.getClientHeight() - d;
        if (b <= a.optUp.offset && c) {
          a.triggerUpScroll()
        }
      }
      if (a.optUp.toTop.src) {
        if (d >= a.optUp.toTop.offset) {
          a.showTopBtn()
        } else {
          a.hideTopBtn()
        }
      }
    }
    a.optUp.onScroll && a.optUp.onScroll(a, d, c)
  };
  if (a.isScrollBody) {
    window.addEventListener("scroll", a.scrollEvent)
  } else {
    a.scrollDom.addEventListener("scroll", a.scrollEvent)
  }
  setTimeout(function() {
      a.optUp.inited(a, a.upwarp)
    },
    0)
};
MeScroll.prototype.triggerUpScroll = function() {
  this.showUpScroll();
  this.optUp.page.num++;
  this.optUp.callback && this.optUp.callback(this.optUp.page, this)
};
MeScroll.prototype.showUpScroll = function() {
  this.isUpScrolling = true;
  this.upwarp.classList.add(this.optUp.hardwareClass);
  this.upwarp.style.visibility = "visible";
  this.optUp.showLoading(this, this.upwarp)
};
MeScroll.prototype.showNoMore = function() {
  this.upwarp.style.visibility = "visible";
  this.optUp.isLock = true;
  this.optUp.showNoMore(this, this.upwarp)
};
MeScroll.prototype.hideUpScroll = function() {
  this.upwarp.style.visibility = "hidden";
  this.upwarp.classList.remove(this.optUp.hardwareClass)
};
MeScroll.prototype.endUpScroll = function(a) {
  if (a != null) {
    if (a) {
      this.showNoMore()
    } else {
      this.hideUpScroll()
    }
  }
  this.isUpScrolling = false
};
MeScroll.prototype.resetUpScroll = function(b) {
  if (this.optUp && this.optUp.use) {
    let a = this.optUp.page;
    this.prePageNum = a.num;
    this.prePageTime = a.time;
    a.num = 1;
    a.time = null;
    if (!this.isDownScrolling && b != false) {
      if (b == null) {
        this.removeEmpty();
        this.clearDataList();
        this.showUpScroll()
      } else {
        this.showDownScroll()
      }
    }
    this.optUp.callback && this.optUp.callback(a, this)
  }
};
MeScroll.prototype.clearDataList = function() {
  let b = this.optUp.clearId || this.optUp.clearEmptyId;
  if (b) {
    let a = document.getElementById(b);
    if (a) {
      a.innerHTML = ""
    }
  }
};
MeScroll.prototype.endByPage = function(b, d, c) {
  let a;
  if (this.optUp.use && d != null) {
    a = this.optUp.page.num < d
  }
  this.endSuccess(b, a, c)
};
MeScroll.prototype.endBySize = function(c, b, d) {
  let a;
  if (this.optUp.use && b != null) {
    let e = (this.optUp.page.num - 1) * this.optUp.page.size + c;
    a = e < b
  }
  this.endSuccess(c, a, d)
};
MeScroll.prototype.endSuccess = function(c, a, e) {
  if (this.isDownScrolling) {
    this.endDownScroll()
  }
  if (this.optUp.use) {
    let f = this.optUp.page.num;
    let b = this.optUp.page.size;
    if (f == 1) {
      this.clearDataList()
    }
    let d;
    if (c != null) {
      if (c < b || a == false) {
        this.optUp.isLock = true;
        if (c == 0 && f == 1) {
          d = false;
          this.showEmpty()
        } else {
          let g = (f - 1) * b + c;
          if (g < this.optUp.noMoreSize) {
            d = false
          } else {
            d = true
          }
          this.removeEmpty()
        }
      } else {
        d = false;
        this.optUp.isLock = false;
        this.removeEmpty()
      }
    }
    if (f == 1 && e) {
      this.optUp.page.time = e
    }
    this.endUpScroll(d);
    this.loadFull()
  }
};
MeScroll.prototype.endErr = function() {
  if (this.isDownScrolling) {
    let a = this.optUp.page;
    if (a && this.prePageNum) {
      a.num = this.prePageNum;
      a.time = this.prePageTime
    }
    this.endDownScroll()
  }
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false)
  }
};
MeScroll.prototype.loadFull = function() {
  let a = this;
  if (a.optUp.loadFull.use && !a.optUp.isLock && a.getScrollHeight() <= a.getClientHeight()) {
    setTimeout(function() {
        if (a.getScrollHeight() <= a.getClientHeight()) {
          a.triggerUpScroll()
        }
      },
      a.optUp.loadFull.delay)
  }
};
MeScroll.prototype.lockUpScroll = function(a) {
  if (a == null) {
    a = true
  }
  this.optUp.isLock = a
};
MeScroll.prototype.showEmpty = function() {
  let b = this;
  let c = b.optUp.empty;
  let a = c.warpId || b.optUp.clearEmptyId;
  if (a == null) {
    return
  }
  let f = document.getElementById(a);
  if (f) {
    b.removeEmpty();
    let e = "";
    if (c.icon) {
      e += '<img class="empty-icon" src="' + c.icon + '"/>'
    }
    if (c.tip) {
      e += '<p class="empty-tip">' + c.tip + "</p>"
    }
    if (c.btntext) {
      e += '<p class="empty-btn">' + c.btntext + "</p>"
    }
    b.emptyDom = document.createElement("div");
    b.emptyDom.className = "mescroll-empty";
    b.emptyDom.innerHTML = e;
    f.appendChild(b.emptyDom);
    if (c.btnClick) {
      let d = b.emptyDom.getElementsByClassName("empty-btn")[0];
      d.onclick = function() {
        c.btnClick()
      }
    }
  }
};
MeScroll.prototype.removeEmpty = function() {
  if (this.emptyDom) {
    let a = this.emptyDom.parentNode;
    if (a) {
      a.removeChild(this.emptyDom)
    }
    this.emptyDom = null
  }
};
MeScroll.prototype.showTopBtn = function() {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    let a = this;
    let b = a.optUp.toTop;
    if (a.toTopBtn == null) {
      a.toTopBtn = document.createElement("img");
      a.toTopBtn.className = b.warpClass;
      a.toTopBtn.src = b.src;
      a.toTopBtn.onclick = function() {
        a.scrollTo(0, a.optUp.toTop.duration)
      };
      a.upparent.appendChild(a.toTopBtn)
    }
    a.toTopBtn.classList.remove(b.hideClass);
    a.toTopBtn.classList.add(b.showClass)
  }
};
MeScroll.prototype.hideTopBtn = function() {
  if (this.topBtnShow && this.toTopBtn) {
    this.topBtnShow = false;
    this.toTopBtn.classList.remove(this.optUp.toTop.showClass);
    this.toTopBtn.classList.add(this.optUp.toTop.hideClass)
  }
};
MeScroll.prototype.scrollTo = function(h, k) {
  if (k == 0) {
    this.setScrollTop(h);
    return
  }
  k = k || 300;
  let f = 20;
  let e = k / f;
  let g = this;
  let a = g.getScrollHeight() - g.getClientHeight();
  if (h < 0) {
    h = 0
  }
  if (h > a) {
    h = a
  }
  let j = g.getScrollTop() - h;
  if (j == 0) {
    return
  }
  let b = j / e;
  g.isScrollTo = true;
  let c = 0;
  let d = window.setInterval(function() {
      if (c < e) {
        if (c == e - 1) {
          g.setScrollTop(h)
        } else {
          let i = g.getScrollTop() - b;
          g.setScrollTop(i)
        }
        c++
      } else {
        g.isScrollTo = false;
        window.clearInterval(d)
      }
    },
    f)
};
MeScroll.prototype.getScrollHeight = function() {
  return this.scrollDom.scrollHeight
};
MeScroll.prototype.getClientHeight = function() {
  if (this.isScrollBody && document.compatMode == "CSS1Compat") {
    return document.documentElement.clientHeight
  } else {
    return this.scrollDom.clientHeight
  }
};
MeScroll.prototype.getBodyHeight = function() {
  return document.body.clientHeight || document.documentElement.clientHeight
};
MeScroll.prototype.getScrollTop = function() {
  if (this.isScrollBody) {
    return document.documentElement.scrollTop || document.body.scrollTop
  } else {
    return this.scrollDom.scrollTop
  }
};
MeScroll.prototype.setScrollTop = function(a) {
  if (this.isScrollBody) {
    document.documentElement.scrollTop = a;
    document.body.scrollTop = a
  } else {
    this.scrollDom.scrollTop = a
  }
};
MeScroll.prototype.destroy = function() {
  let a = this;
  a.isInUse = false;
  if (a.optDown.use) {
    a.scrollDom.removeEventListener("touchstart", a.touchstartEvent);
    a.scrollDom.removeEventListener("mousedown", a.touchstartEvent);
    a.scrollDom.removeEventListener("touchmove", a.touchmoveEvent);
    a.scrollDom.removeEventListener("mousemove", a.touchmoveEvent);
    a.scrollDom.removeEventListener("touchend", a.touchendEvent);
    a.scrollDom.removeEventListener("mouseup", a.touchendEvent);
    a.scrollDom.removeEventListener("mouseleave", a.touchendEvent);
    a.downparent && a.downparent.removeChild(a.downwarp)
  }
  if (a.optUp.use) {
    if (a.isScrollBody) {
      window.removeEventListener("scroll", a.scrollEvent)
    } else {
      a.scrollDom.removeEventListener("scroll", a.scrollEvent)
    }
    a.upparent && a.upparent.removeChild(a.upwarp)
  }
};

MeScroll.prototype.deactivated = function() {
  let a = this;
  a.beActivated = false;
  if (a.optDown.use) {
    a.scrollDom.removeEventListener("touchstart", a.touchstartEvent);
    a.scrollDom.removeEventListener("mousedown", a.touchstartEvent);
    a.scrollDom.removeEventListener("touchmove", a.touchmoveEvent);
    a.scrollDom.removeEventListener("mousemove", a.touchmoveEvent);
    a.scrollDom.removeEventListener("touchend", a.touchendEvent);
    a.scrollDom.removeEventListener("mouseup", a.touchendEvent);
    a.scrollDom.removeEventListener("mouseleave", a.touchendEvent);
  }
  if (a.optUp.use) {
    if (a.isScrollBody) {
      window.removeEventListener("scroll", a.scrollEvent)
    } else {
      a.scrollDom.removeEventListener("scroll", a.scrollEvent)
    }
  }
};

MeScroll.prototype.activated = function() {
  let a = this;
  a.beActivated = true;
  if (a.optDown.use) {
    a.scrollDom.addEventListener("touchstart", a.touchstartEvent);
    a.scrollDom.addEventListener("mousedown", a.touchstartEvent);
    a.scrollDom.addEventListener("touchmove", a.touchmoveEvent);
    a.scrollDom.addEventListener("mousemove", a.touchmoveEvent);
    a.scrollDom.addEventListener("touchend", a.touchendEvent);
    a.scrollDom.addEventListener("mouseup", a.touchendEvent);
    a.scrollDom.addEventListener("mouseleave", a.touchendEvent);
  }
  if (a.optUp.use) {
    if (a.isScrollBody) {
      window.addEventListener("scroll", a.scrollEvent)
    } else {
      a.scrollDom.addEventListener("scroll", a.scrollEvent)
    }
  }
};

export default MeScroll;
