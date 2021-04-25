<template>
  <div class="bgc">
    <div class="top-bgc"></div>
    <!-- 头部开始 ----------------->
    <div class="user-profile">
      <div class="user-profile-avatar">
        <img :src="user.userAvatar" alt="" />
      </div>
      <div class="user-profile-header-info-m">
        <div class="user-profile-head-name">
          <div>{{ user.userName }}</div>
        </div>
      </div>
      <div class="user-profile-header-info-b">
        <ul>
          <li>
            <div class="user-profile-statistics-num" data-v-d1dbb6f8="">0</div>
            <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
              被访问量
            </div>
          </li>
          <li>
            <div class="user-profile-statistics-num" data-v-d1dbb6f8="">0</div>
            <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
              被访问量
            </div>
          </li>
          <li>
            <div class="user-profile-statistics-num" data-v-d1dbb6f8="">12</div>
            <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
              原创文章
            </div>
          </li>
          <li>
            <div class="user-profile-statistics-num" data-v-d1dbb6f8="">5</div>
            <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
              作者排名
            </div>
          </li>
          <li>
            <div class="user-profile-statistics-num" data-v-d1dbb6f8="">0</div>
            <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
              粉丝数量
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 头部结束 ----------------->

    <!-- 内容开始--------------------- -->
    <div class="user-profile-body-inner">
      <div class="user-profile-body-left">
        <div class="user-profile-aside">
          <div class="user-general-info single-general-info" data-v-d487ed78="">
            <ul data-v-d487ed78="">
              <li class="user-general-info-join-csdn" data-v-d487ed78="">
                <i data-v-d487ed78=""></i> <span data-v-d487ed78="">于</span>
                <span class="user-general-info-key-word" data-v-d487ed78=""
                  >2020-02-07</span
                >
                <span data-v-d487ed78="">加入GDUT</span>
              </li>
            </ul>
          </div>
          <div class="aside-common-box-head" data-v-d487ed78="">获得成就</div>
          <div class="aside-common-box-bottom" data-v-d487ed78="">
            <div class="aside-common-box-content" data-v-d487ed78="">
              <ul data-v-d487ed78="">
                <li data-v-d487ed78="">
                  <i
                    style="background-image: url(https://img-home.csdnimg.cn/images/20210114022819.png)"
                  ></i>
                  <div>获得<span>0</span>次点赞</div>
                </li>
                <li data-v-d487ed78="">
                  <i
                    style="background-image: url(https://img-home.csdnimg.cn/images/20210114022831.png)"
                  ></i>
                  <div>内容获得<span>0</span>次评论</div>
                </li>
                <li data-v-d487ed78="">
                  <i
                    style="background-image: url(https://img-home.csdnimg.cn/images/20210114022828.png)"
                  ></i>
                  <div>获得<span>0</span>次收藏</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="user-profile-body-right">
        <div class="navList" data-v-bb5f5e3e="">
          <ul data-v-bb5f5e3e="">
            <li class="" data-v-bb5f5e3e="">
              <!---->最近<span class="nav-li-num" data-v-bb5f5e3e=""></span>
            </li>
            <li data-v-bb5f5e3e="" class="active">
              <!---->文章·<span class="nav-li-num" data-v-bb5f5e3e="">0</span>
            </li>
            <li data-v-bb5f5e3e="" class="">
              <!---->资源·<span class="nav-li-num" data-v-bb5f5e3e="">0</span>
            </li>
            <li data-v-bb5f5e3e="" class="">
              <!---->问答·<span class="nav-li-num" data-v-bb5f5e3e="">0</span>
            </li>
            <li data-v-bb5f5e3e="" class="">
              <!---->课程·<span class="nav-li-num" data-v-bb5f5e3e="">0</span>
            </li>
            <li data-v-bb5f5e3e="" class="">
              <!---->帖子·<span class="nav-li-num" data-v-bb5f5e3e="">0</span>
            </li>
            <li data-v-bb5f5e3e="" class="">
              <!---->收藏<span class="nav-li-num" data-v-bb5f5e3e=""></span>
            </li>
            <li data-v-bb5f5e3e="" class="">
              <!---->关注/订阅<span
                class="nav-li-num"
                data-v-bb5f5e3e=""
              ></span>
            </li>
          </ul>
          <!-- <div class="search-input" data-v-bb5f5e3e=""><input id="searchInput" type="text"
                            placeholder="搜TA的内容" value="" data-v-bb5f5e3e="">
                        <div class="search-btn" data-v-bb5f5e3e=""><img
                                src="https://img-home.csdnimg.cn/images/20210127052220.png" alt="" class="search-img"
                                data-v-bb5f5e3e=""> <img src="https://img-home.csdnimg.cn/images/20210127052218.png"
                                alt="" class="search-hover-img" data-v-bb5f5e3e=""></div>
                    </div>
                    <div class="m-search-input" data-v-bb5f5e3e=""><input id="mSearchInput" type="text"
                            placeholder="搜TA的内容" value="" data-v-bb5f5e3e="" style="display: none;">
                        <div class="m-search-btn" data-v-bb5f5e3e=""><img
                                src="https://img-home.csdnimg.cn/images/20210127052220.png" alt="" class="m-search-img"
                                data-v-bb5f5e3e=""> <img src="https://img-home.csdnimg.cn/images/20210127052218.png"
                                alt="" class="m-search-hover-img" data-v-bb5f5e3e=""></div>
                    </div> -->
        </div>
      </div>
    </div>
    <!-- 内容结束--------------------- -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["token", "user"])
  }
};
</script>

<style scoped>
.bgc {
  height: 900px;
  width: 2000px;
  background-color: rgb(244, 245, 245);
}
body {
  background-color: rgb(244, 245, 245);
}
.top-bgc {
  height: 150px;
  background-color: rgb(34, 46, 60);
}
.user-profile {
  height: 285px;

  position: relative;
  background-color: #fff;
}
.user-profile-avatar {
  position: absolute;
  height: 104px;
  width: 104px;
  background-color: rosybrown;
  left: 50%;
  top: -36px;
  transform: translateX(-50%);
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 6%);
  border: 4px solid #fff;
  border-radius: 50%;
  background: #fff;
}

.user-profile-avatar img {
  width: 100%;
  height: 100%;
  /* display: block; */
  border-radius: 50%;
  display: block;
}
.user-profile-header-info-m {
  /* margin-top: 120px; */
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.user-profile-head-name {
  color: #222226;
  font-size: 22px;
  font-weight: 500;
  line-height: 24px;
  /* display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center; */
}
.user-profile-header-info-b {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.user-profile-header-info-b ul {
  display: flex;
}
.user-profile-header-info-b ul li {
  list-style: none;
  float: left;
  height: 100px;
  width: 100px;
  margin: 5px 10px;
  /* background-color: rosybrown; */
  /* flex: 1; */
}
.user-profile-statistics-num {
  height: 50px;
  line-height: 50px;
  color: #222226;
  font-family: DINCond-Black;
  font-size: 20px;
  font-weight: 500;
}
.user-profile-statistics-name {
  color: #999aaa;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}
.user-profile-body-inner {
  margin: 15px 30px 0px 30px;
}
.user-profile-body-left {
  float: left;
  width: 300px;
}
.user-general-info {
  color: #555666;
  padding-left: 16px;
  line-height: 50px;
  background-color: #fff;
  height: 50px;
}
.user-general-info ul {
  margin: 0;
  padding: 0;
}
.user-general-info-join-csdn {
  list-style: none;
}
.aside-common-box-head {
  margin-top: 10px;
  font-size: 16px;
  color: #222226;
  font-weight: 500;
  line-height: 48px;
  padding-left: 16px;
  border-bottom: 1px solid #e8e8ed;
  height: 48px;
  background-color: #fff;
}
.aside-common-box-content {
  height: 120px;
  background-color: #fff;
}
.aside-common-box-content ul {
  margin: 0px;
  padding: 0px;
  font-size: 14px;
  color: #212529;
  font-weight: 400;
  list-style: none;
  padding-left: 16px;
}
.aside-common-box-content ul li {
  height: 40px;
  line-height: 40px;
}
.user-profile-body-right {
  float: left;
  margin-left: 30px;
  width: 1080px;
}
.navList {
  background-color: #fff;
  height: 50px;
}
.navList ul {
  /* background-color: #fff; */
  margin: 0;
  padding: 0;
  padding-left: 20px;
  line-height: 50px;
  display: flex;
  width: 80%;
  /* height: 36px; */
}
.navList ul li {
  flex: 1;
  list-style: none;
}
</style>