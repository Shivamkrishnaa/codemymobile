import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from './api/axios'
import React, { Component } from 'react'
import { List, Panel, FlexboxGrid, Container, Header, Navbar, Content, Footer } from 'rsuite';
import { Pagination } from 'rsuite';
import Accordian from './accordian';
import 'rsuite/dist/styles/rsuite-default.css';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [],
      pages: 1,
      page: 1,
      limit : 10,
      scrolls: scroll
    }

    this.handleSelect2 = this.handleSelect2.bind(this);

  }


listUsers() {
    axios.get('/api/v1/user?page='+this.state.page, {})
      .then(r => {
        this.setState({ user: r.data.data, page: r.data.page, pages: r.data.pages })
      })
      .catch(err => {
        console.log(err)
      });
  }
  componentDidMount() {
    console.clear()
    this.listUsers();
  }
  handleSelect2(eventKey) {
    this.setState({ page: eventKey }, this.listUsers );
  } 
  scrollToBottom() {
    scroll.scrollToBottom();
  }
  render() {
    return (
      <React.Fragment>
        <div className={styles.container}>
          <Head>
            <title>Socialize</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          </Head>

          <div className={styles.main} onClick={this.scrollToBottom}>
            <h1 className={styles.title}>
              Welcome to Socialize!
      </h1>

            <p className={styles.description}>
              Socialize is a social media website.{' '}
              <code className={styles.code}>Build using NodeJs, ReactJs, NextJS and Mysql.</code>
            </p>

            <div className={styles.grid} >
              <div href="#" className={styles.card}>
                <h3>People &rarr;</h3>
                <p>Fetching users with basic pagination.</p>
                <div className="show-fake-browser login-page">

                </div>
              </div>

            </div>
          </div>

        </div>


        <Panel ref={this.myDivToFocus}>
          <Content>
            <FlexboxGrid colSpan={12} justify="center">
              <FlexboxGrid.Item colSpan={12}>
                <Panel bordered>
                  <Accordian data={this.state.user} />
                </Panel>
                <Pagination onSelect={(e) => this.handleSelect2(e)} pages={this.state.pages} activePage={this.state.page} />
              </FlexboxGrid.Item>
            </FlexboxGrid></Content>
        </Panel>

      </React.Fragment>

    )
  }
}

export default Home


