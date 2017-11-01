import React from "react";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Container, Content, Text, Title, H1, Button } from "native-base";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  rowBorder: {
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  rowBorderBottom: {
    borderBottomWidth: 1,
    borderColor: "#000",
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  borderless: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  simpleBorder: {
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  whiteText: {
    color: "#fff"
  }
});
export const FightWarnings = props => {
  const { fight } = props;
  let mappedJudgeNames = undefined;
  if (props.rounds.length > 0)
    mappedJudgeNames = props.rounds[0].judges.map((judge, key) => {
      return (
        <Row key={key}>
          <Col style={styles.simpleBorder}>
            <Text>{judge.firstName + " " + judge.surname}</Text>
          </Col>
          <Col style={styles.simpleBorder}>
            <Row style={styles.rowBorderBottom}>
              <Text>Cautions</Text>
            </Row>
            <Row style={styles.rowBorderBottom}>
              <Text>Knock downs</Text>
            </Row>
            <Row style={styles.rowBorderBottom}>
              <Text>Warnings</Text>
            </Row>
            <Row style={styles.rowBorderBottom}>
              <Text>J</Text>
            </Row>
            <Row style={styles.borderless}>
              <Text>X</Text>
            </Row>
          </Col>
        </Row>
      );
    });

  const mappedRedRounds = props.rounds.map((round, key) => {
    return (
      <Col key={key}>
        <Row style={styles.rowBorder}>
          <Text style={styles.whiteText}>Round {key + 1}</Text>
        </Row>
        {round.judges.map((judge, i) => {
          return (
            <Row key={i}>
              <Col style={styles.simpleBorder}>
                <Row style={styles.rowBorderBottom}>
                  <Text style={styles.whiteText}>{judge.redCautions}</Text>
                </Row>
                <Row style={styles.rowBorderBottom}>
                  <Text style={styles.whiteText}>{judge.redKnockDown}</Text>
                </Row>
                <Row style={styles.rowBorderBottom}>
                  <Text style={styles.whiteText}>{judge.redWarnings}</Text>
                </Row>
                <Row style={styles.rowBorderBottom}>
                  <Text style={styles.whiteText}>{judge.redJ}</Text>
                </Row>
                <Row style={styles.borderless}>
                  <Text style={styles.whiteText}>{judge.redX}</Text>
                </Row>
              </Col>
            </Row>
          );
        })}
      </Col>
    );
  });

  const mappedBlueRounds = props.rounds.map((round, key) => {
    return (
      <Col key={key}>
        <Row style={styles.rowBorder}>
          <Text style={styles.whiteText}>Round {key + 1}</Text>
        </Row>
        {round.judges.map((judge, i) => {
          return (
            <Row key={i}>
              <Col style={styles.simpleBorder}>
                <Row style={styles.rowBorderBottom}>
                  <Text style={styles.whiteText}>{judge.blueCautions}</Text>
                </Row>
                <Row style={styles.rowBorderBottom}>
                  <Text style={styles.whiteText}>{judge.blueKnockDown}</Text>
                </Row>
                <Row style={styles.rowBorderBottom}>
                  <Text style={styles.whiteText}>{judge.blueWarnings}</Text>
                </Row>
                <Row style={styles.rowBorderBottom}>
                  <Text style={styles.whiteText}>{judge.blueJ}</Text>
                </Row>
                <Row style={styles.borderless}>
                  <Text style={styles.whiteText}>{judge.blueX}</Text>
                </Row>
              </Col>
            </Row>
          );
        })}
      </Col>
    );
  });
  return (
    <Container>
      <Content>
        <Grid>
          <Col>
            <Row style={styles.borderless} />
            <Row style={styles.borderless} />
            {mappedJudgeNames}
          </Col>
          <Col style={{ backgroundColor: "#cd2626" }}>
            <Row style={styles.rowBorder}>
              <Text style={styles.whiteText}>
                {fight.redAthlete.firstName + " " + fight.redAthlete.surname}
              </Text>
            </Row>
            <Row>{mappedRedRounds}</Row>
          </Col>
          <Col style={{ backgroundColor: "#1874cd" }}>
            <Row style={styles.rowBorder}>
              <Text style={styles.whiteText}>
                {" "}
                {fight.blueAthlete.firstName + " " + fight.blueAthlete.surname}
              </Text>
            </Row>
            <Row>{mappedBlueRounds}</Row>
          </Col>
        </Grid>
      </Content>
    </Container>
  );
};

export default FightWarnings;
