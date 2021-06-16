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
            <div class="user-profile-statistics-num" data-v-d1dbb6f8="">12</div>
            <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
              原创文章
            </div>
          </li>
          <li>
            <div class="user-profile-statistics-num" data-v-d1dbb6f8="">5</div>
            <div class="user-profile-statistics-name" data-v-d1dbb6f8="">
              他的关注
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
    <div>
        <a-collapse default-active-key="1" :bordered="false">
           <a-collapse-panel key="1" header="用户资料V" :style="messagestyle" :showArrow=false>
              <a-descriptions size="middle" style="text-align:left" layout="vertical">
                  <a-descriptions-item label="用户名">
                     {{userInfo.username}}
                  </a-descriptions-item>
                  <a-descriptions-item label="性别">
                     {{userInfo.usersex}}
                  </a-descriptions-item>
                  <a-descriptions-item label="用户生日">
                     {{userInfo.userbirthday}}
                  </a-descriptions-item>
                  <a-descriptions-item label="用户邮箱">
                     {{userInfo.useremail}}
                  </a-descriptions-item>
                  <a-descriptions-item label="用户留言">
                     {{userInfo.usermessage}}
                  </a-descriptions-item>
                  <a-descriptions-item label="入驻时间">
                     {{userInfo.creattime}}
                  </a-descriptions-item>
                  </a-descriptions>
             </a-collapse-panel>
        </a-collapse>
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
          </ul>
          
  <template>
  <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
    <div slot="footer"><b>My Treasure </b> Post</div>
    <a-list-item slot="renderItem" key="item.title" slot-scope="item">
      <template v-for="{ type, text } in actions" slot="actions">
        <span :key="type">
          <a-icon :type="type" style="margin-right: 10px" />
          {{ text }}
        </span>
      </template>
      <img
        slot="extra"
        width="290"
        alt="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
      <a-list-item-meta :description="item.description">
        <a slot="title" :href="item.href">{{ item.title }}</a>
        <a-avatar slot="avatar" :src="item.avatar" />
      </a-list-item-meta>
      {{ item.content }}
    </a-list-item>
  </a-list>
</template>


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
import { getInfo } from "@/network/auth.js";
export default {
  name: "Profile",
  data() {
    return {
      messagestyle:'background: #f0a1a8;border-radius: 4px;margin-bottom: 24px;border: 0;text-align:center',
      listData,
      pagination: {
        pageSize: 4,
      },
      id:"",
      userInfo:{
        username:"",
        usersex:"",
        userbirthday:"",
        useremail:"",
        usermessage:"",
        creattime:""
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
      ],
    };
  },
  computed: {
    ...mapGetters(["token", "user"])
  },
  created(){
    this.id = this.$route.query.id;
        getInfo(this.id).then(response => {
          for(var key in response.map)
          if(key =="false"){
           const form = response.map[key];
           this.userInfo.username = form.userName;
           this.userInfo.usersex = form.userSex;
           this.userInfo.useremail = form.userEmail;
           this.userInfo.usermessage = form.userStatement;
           this.userInfo.userbirthday = form.userBirthday;
           this.userInfo.creattime = form.creatTime
          }else if(key =="true"){
            this.$router.go('/Profile');
          } 
        })
  },
};

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: '1111',
    title: `RNG电子竞技俱乐部 ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'RNG, A FOREVER G0D for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

</script>

<style scoped>
.bgc {
  height: 125rem /* 900/16 */;
  width: 125rem /* 2000/16 */;
  /* background-color: rgb(244, 245, 245); */
  background-color: rgb(241, 246, 250);
  margin-left: 3rem /* 30/16 */;
}

/* body {
  background-color: red;
} */
.top-bgc {
  height: 9.375rem /* 150/16 */;
  background-color: rgb(241, 246, 250);
}
.user-profile {
  height: 14rem /* 285/16 */;

  position: relative;
  background-color: rgb(244, 245, 245);
}
.user-profile-avatar {
  position: absolute;
  height: 6.5rem /* 104/16 */;
  width: 6.5rem /* 104/16 */;
  background-color: rosybrown;
  left: 50%;
  top: -2.25rem /* 36/16 */;
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
  top: 5rem /* 80/16 */;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.user-profile-head-name {
  color: #222226;
  font-size: 1.375rem /* 22/16 */;
  font-weight: 500;
  line-height: 1.5rem /* 24/16 */;
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
  top: 6.25rem /* 100/16 */;
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
  height: 6.25rem /* 100/16 */;
  width: 6.25rem /* 100/16 */;
  margin: 5px 10px;
  /* background-color: rosybrown; */
  /* flex: 1; */
}
.user-profile-statistics-num {
  height: 3.125rem /* 50/16 */;
  line-height: 3.125rem /* 50/16 */;
  color: #222226;
  font-family: DINCond-Black;
  font-size: 1.25rem /* 20/16 */;
  font-weight: 500;
}
.user-profile-statistics-name {
  color: #999aaa;
  font-size: 0.875rem /* 14/16 */;
  height: 3.125rem /* 50/16 */;
  line-height: 3.125rem /* 50/16 */;
}
.user-profile-body-inner {
  margin: 0.9375rem /* 15/16 */ 1.875rem /* 30/16 */ 0px 30px;
}
.user-profile-body-left {
  float: left;
  width: 18.75rem /* 300/16 */;
}
.user-general-info {
  color: #555666;
  padding-left: 1rem /* 16/16 */;
  line-height: 3.125rem /* 50/16 */;
  background-color: rgb(244, 245, 245);
  height: 3.125rem /* 50/16 */;
}
.user-general-info ul {
  margin: 0;
  padding: 0;
}
.user-general-info-join-csdn {
  list-style: none;
}
.aside-common-box-head {
  margin-top: 0.625rem /* 10/16 */;
  font-size: 1rem /* 16/16 */;
  color: #222226;
  font-weight: 500;
  line-height: 3rem /* 48/16 */;
  padding-left: 1rem /* 16/16 */;
  border-bottom: 1px solid #e8e8ed;
  height: 3rem /* 48/16 */;
  background-color: rgb(244, 245, 245);
}
.aside-common-box-content {
  height: 7.5rem /* 120/16 */;
  background-color: rgb(244, 245, 245);
}
.aside-common-box-content ul {
  margin: 0px;
  padding: 0px;
  font-size: 0.875rem /* 14/16 */;
  color: #212529;
  font-weight: 400;
  list-style: none;
  padding-left: 1rem /* 16/16 */;
}
.aside-common-box-content ul li {
  height: 2.5rem /* 40/16 */;
  line-height: 2.5rem /* 40/16 */;
}
.user-profile-body-right {
  float: left;
  margin-left: 1.875rem /* 30/16 */;
  width: 90rem /* 1080/16 */;
}
.navList {
  background-color: rgb(244, 245, 245);
  height: 3.125rem /* 50/16 */;
}
.navList ul {
  /* background-color: #fff; */
  margin: 0;
  padding: 0;
  padding-left: 1.25rem /* 20/16 */;
  line-height: 3.125rem /* 50/16 */;
  display: flex;
  width: 80%;
  /* height: 36px; */
}
.navList ul li {
  flex: 1;
  list-style: none;
}
</style>