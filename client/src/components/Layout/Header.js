import React, { Component } from 'react';
import "../../App2.css";

export default class Header extends Component {
    render() {
        return (
           
								<header id="header">
									<a href="#" class="logo"><strong>Blog Application</strong> by TANU SHARMA</a>
									<ul class="icons">
										<li><a href="https://www.facebook.com/" class="icon1 brands"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
										<li><a href="https://www.facebook.com/" class="icon1 brands"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
										<li><a href="https://www.snapchat.com/" class="icon1 brands"><i class="fa fa-snapchat" aria-hidden="true"></i></a></li>
										<li><a href="https://www.instagram.com/" class="icon1 brands"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
									</ul>
								</header>
        )
    }
}
