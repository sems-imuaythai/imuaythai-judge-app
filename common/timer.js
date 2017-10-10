import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      remainingTime: props.totalDuration,
      timerType: props.timerType,
      played: false
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    const width = props.msecs ? 220 : 150;
    this.defaultStyles = {
      container: {
        backgroundColor: "#000",
        padding: 5,
        borderRadius: 5,
        width: width
      },
      text: {
        fontSize: 30,
        color: "#FFF",
        marginLeft: 7
      }
    };
  }

  componentDidMount() {
    if (this.props.started) {
      this.start();
    }
  }
  componentWillUnmount() {
    this.stop();
  }

  componentWillReceiveProps(newProps) {
    if (this.state.timerType !== newProps.timerType) {
      this.setState({
        remainingTime: newProps.totalDuration,
        timerType: newProps.timerType
      });
    }
    if (newProps.start) {
      this.start();
    } else {
      this.stop();
    }
    if (newProps.reset) {
      this.reset();
    }
  }

  start() {
    if (this.state.started) return;
    const handleFinish = this.props.handleFinish
      ? this.props.handleFinish
      : () => console.log("Timer finished");
    const endTime = new Date().getTime() + this.state.remainingTime;
    this.interval = setInterval(() => {
      const remaining = endTime - new Date();
      if (
        remaining <= 10000 &&
        this.state.timerType === "pause" &&
        !this.state.played
      ) {
        this.props.playPreSound();
        this.setState({ played: true });
      }
      if (remaining <= 100) {
        this.setState({ remainingTime: 0 });
        this.stop();
        handleFinish();
        return;
      }
      this.setState({ remainingTime: remaining, started: true });
    }, 1);
  }

  stop() {
    this.setState({ started: false, played: false });
    clearInterval(this.interval);
  }

  reset() {
    this.setState({ remainingTime: this.props.totalDuration });
  }

  formatTime() {
    let now = this.state.remainingTime;
    let msecs = now % 1000;

    if (msecs < 10) {
      msecs = `00${msecs}`;
    } else if (msecs < 100) {
      msecs = `0${msecs}`;
    }

    let seconds = Math.floor(now / 1000);
    let minutes = Math.floor(now / 60000);
    let hours = Math.floor(now / 3600000);
    seconds = seconds - minutes * 60;
    minutes = minutes - hours * 60;

    let formatted;

    if (this.props.msecs) {
      formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10
        ? 0
        : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}:${msecs}`;
    } else {
      formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10
        ? 0
        : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    }

    if (typeof this.props.getTime === "function") this.props.getTime(formatted);

    return formatted;
  }

  render() {
    const styles = this.props.options ? this.props.options : this.defaultStyles;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.formatTime()}</Text>
      </View>
    );
  }
}

export default Timer;
