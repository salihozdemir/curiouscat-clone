<template>
<div class="backgroud">
	<div class="container">
		<div v-if="loading" class="spin">
      <a-spin size="large"/>
    </div>
		<form :class="'signUp ' + signUpClass" @submit.prevent="signUp">
			<img width="40" src="/assets/img/anonymous-pp.png" class="site-logo">
			<input class="w100" type="email" placeholder="Email" autocomplete='off' v-model="email"/>
			<input class="w100" type="string" placeholder="Username" autocomplete='off' required v-model="username"/>
			<input type="password" placeholder="Password" required v-model="password"/>
			<input type="password" placeholder="Verify Password" required style="margin-bottom: 0px;" v-model="verifyPassword" />
			<p class="error-message-signUp">{{errorMessageSignup}}</p>
			<button class="form-btn sx log-in" type="button" @click="goToSignIn()">Log In</button>
			<button class="form-btn dx" type="submit">Sign Up</button>
		</form>
		<form :class="'signIn ' + signInClass" @submit.prevent="logIn">
			<h3>Welcome <br> Back !</h3>
			<input type="email" placeholder="Email" autocomplete='off' required v-model="email"/>
			<input type="password" placeholder="Password" autocomplete='off' required v-model="password" />
			<p style="color: indianred">{{errorMessageLogin}}</p>
			<button class="form-btn sx back" type="button" @click="goToSignUp()">Back</button>
			<button class="form-btn dx" type="submit">Log In</button>
		</form>
	</div>
</div>
</template>
<script>
import AuthService from '@/services/auth';
import notificationService from '@/services/notification';
import questionService from '@/services/question';
import followService from '@/services/follow';

export default {
  data(){
    return {
      signInClass: '',
			signUpClass: '',
			email: '',
			password: '',
			verifyPassword: '',
			username: '',
			errorMessageLogin: '',
			errorMessageSignup: '',
			loading: false,
    }
  },
  methods: {
    goToSignIn() {
      this.signInClass = 'active-dx';
			this.signUpClass = 'inactive-sx';
			this.clearText();
    },
    goToSignUp() {
      this.signUpClass = 'active-sx';
			this.signInClass = 'inactive-dx';
			this.clearText();
		},
		clearText() {
			this.email = '';
			this.password = '';
			this.verifyPassword = '';
			this.username = '';
			this.errorMessageLogin = '';
			this.errorMessageSignup = '';
		},
		async logIn() {
			this.loading = true;
			const res = await AuthService.logIn({
				email: this.email,
				password: this.password
			});
			if(!res.data) this.errorMessageLogin = res.response.data.message;
			else {
				await this.setState(res.data);
				this.$router.push({name: 'Home'});
			}
			this.loading = false;
		},
		async signUp() {
			this.loading = true;
			if(this.password === this.verifyPassword) {
				const res = await AuthService.signUp({
					email: this.email,
					username: this.username,
					password: this.password
				});
				if(!res.data) this.errorMessageSignup = res.response.data.message;
				else { 
					await this.setState(res.data);
					this.$router.push({ name: 'Home' });
				}
			} else {
				this.errorMessageSignup = "Two passwords that you enter is inconsistent!";
			}
			this.loading = false;
		},
		setState(data) {
			this.$store.commit('setLoginUserId', data.userId);
			this.$store.commit('setloginUserName', data.username);
			this.$store.commit('setToken', data.token);
			this.$store.commit('setInboxCount', data.inboxCount);
			this.$store.commit('setNotificationCount', data.notificationCount);
		},
		createQuestion() {
			questionService.createQuestion({
				toUser: '',
				fromUser: '',
				isAnon: false,
				questionText: 'Would you please review this site and share your opinions with me?',
			});
		},
		createNotification(username) {
			notificationService.createNotification({
				toUser: '',
				fromUser: '',
				notificationText: "Welcome" + username + " , I am the creator of this site." + 
					" Feel free asking me questions about this site or whatever you want." +
					" I'll be answering soon. Have fun!",
			});
		},
		followAdmin() {
			followService.followOrUnFollow({
        toUserId: '',
        fromUserId: '',
      });
		}
  }
};
</script>
<style scoped>
.spin {
	position: absolute;
	width: 310px;
	height: 500px;
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #f5f5f58f;
}

.backgroud {
  background-color: #f0f2f5;
	background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%2357bad3' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%23a8c7d3' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2358bbd3' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%239fc6d4' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%2359bbd3' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%2395c5d4' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%235abcd3' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%238ac4d4' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%235bbcd3' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%237fc3d4' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%235cbdd3' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%2373c2d3' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
	background-attachment: fixed;
	background-size: cover;
  height: 100vh;
}

.site-logo {
  width: 100px;
  margin-bottom: 35px;
}

.error-message-signUp {
	margin-top: 10px;
	color: indianred;

}

@import 'https://fonts.googleapis.com/css?family=Dosis|Roboto:300,400|Catamaran';
* {
	margin: 0;
	padding: 0;
}

.container{
	position:absolute;
	width: auto;
	height:auto;
	top: calc(50% - 270px);
	left: calc(50% - 160px);
  
}

form {
	position: absolute;
	text-align: center;
	background: #fff;
	width: 310px;
	height: 500px;
	border-radius: 5px;
	padding: 30px 20px 0 20px;
	box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
	box-sizing: border-box;
}

h3 {
	font-family: 'Roboto';
	font-size: 35px;
	text-transform: uppercase;
	color: #32afd3;
	margin-bottom: 75px;
}

input,
button{
	outline: none !important; 
}

button.form-btn {
	position: absolute;
	width: 50%;
	height: 60px;
	bottom: 0;
	border: 0;
	font-family: 'Dosis';
	font-size: 24px;
	text-transform: uppercase;
	cursor: pointer;
}

button.form-btn.sx {
	left: 0;
	border-radius: 0 0 0 5px;
	background-color: #5c5c5c;
	color: #fff;
	transition:all 0.3s linear;
}

button.form-btn.sx:hover {
	background-color :#5c5c5ccc;
}
button.form-btn.sx:focus {
	border: 1.2px solid;    
	border-color: #32afd3;
}

button.form-btn.sx.back {
	background-color: #5c5c5ccc;
	transition:all 0.3s linear;
	transition: all .3s linear;
}

button.form-btn.sx.back:hover {
	background-color: #5c5c5c91;
}

button.form-btn.dx {
	right: 0;
	border-radius: 0 0 5px 0;
	background-color: #4885b4;
	color: #fff;
	transition: all .3s linear;
}

button.form-btn.dx:hover {
	background-color: #4885b4cc;
}

button.form-btn.dx:focus {
	border: 1px solid;    
	border-color: #32afd3;
}

input {
	border: none;
	border-bottom: 1px solid #95d1e2;
	width: 85%;
	font-family: 'Catamaran';
	color: #32afd3;
	text-align: center;
	font-size: 21px;
	font-weight:100;
	margin-bottom:25px;
}

::-webkit-input-placeholder {
   color: #6f7273;
	font-family: 'Catamaran';
	font-size: 19px;
	font-weight:100;
}

:-moz-placeholder {
   color: #6f7273;  
	font-family: 'Catamaran';
	font-size: 19px;
	font-weight:100;
}

::-moz-placeholder {
   color: #6f7273;  
	font-family: 'Catamaran';
	font-size: 19px;
	font-weight:100;
}

:-ms-input-placeholder {  
   color: #6f7273; 
	font-family: 'Catamaran';
	font-size: 19px;
	font-weight:100;
}

.signIn input,
.signUp .w100 {
	width: 100%;
}

.signIn{
		z-index: 1;
		transform: perspective(100px) translate3d(100px, 0px, -30px);
		opacity: 0.5;
}

.signUp {
	z-index: 2;
}

.active-dx{
	animation-name: foregrounding-dx;
	animation-duration: 0.9s;
	animation-fill-mode: forwards;
}

.active-sx{
	animation-name: foregrounding-sx;
	animation-duration: 0.9s;
	animation-fill-mode: forwards;
}

.inactive-dx{
	animation-name: overshadowing-dx;
	animation-duration: 0.9s;
	animation-fill-mode: forwards;
}

.inactive-sx{
	animation-name: overshadowing-sx;
	animation-duration: 0.9s;
	animation-fill-mode: forwards;
}

@keyframes overshadowing-dx {
	0%{
		z-index:2;
		transform: perspective(100px) translate3d(0px, 0px, 0px);
		opacity: 1;
		box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
	}
	100%{
		z-index: 1;
		transform: perspective(100px) translate3d(100px, 0px, -30px);
		opacity: 0.5;
		box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
	}
}

@keyframes overshadowing-sx {
	0%{
		z-index:2;
		transform: perspective(100px) translate3d(0px, 0px, 0px);
		opacity: 1;
		box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.25);
	}
	100%{
		z-index: 1;
		transform: perspective(100px) translate3d(-100px, 0px, -30px);
		opacity: 0.5;
		box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.25);
	}
}

@keyframes foregrounding-dx {
	0%{
		z-index:1;
		transform: perspective(100px) translate3d(100px, 0px, -30px);
		opacity: 0.5;
	}
	50%{
		z-index:2;
		transform: perspective(100px) translate3d(400px, 0px, -30px);
	}
	100%{
		z-index:2;
		transform: perspective(100px) translate3d(0px, 0px, 0px);
		opacity: 1;
	}
}

@keyframes foregrounding-sx {
	0%{
		z-index:1;
		transform: perspective(100px) translate3d(-100px, 0px, -30px);
		opacity: 0.5;
	}
	50%{
		z-index:2;
		transform: perspective(100px) translate3d(-400px, 0px, -30px);
	}
	100%{
		z-index:2;
		transform: perspective(100px) translate3d(0px, 0px, 0px);
		opacity: 1;
	}
}
</style>
