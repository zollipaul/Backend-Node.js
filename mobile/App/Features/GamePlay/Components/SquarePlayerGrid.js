import React, { PureComponent } from "react";
import { Text, View } from "react-native";

// Styles
import styles from "./Styles/SquarePlayerGridStyle";
import Salvo from "./Salvo";
import { Colors, Metrics} from "../../../Themes/index";

const length =  Metrics.gamePlayPlayerSquareLength;

class SquarePlayerGrid extends PureComponent {
  colorSalvo = () => {
    return this.props.isShip ? Colors.highlight : Colors.white;
  };

  titleOrSalvo = () => {
    if (this.props.title) {
      return <Text style={styles.title}>{this.props.title}</Text>;
    } else if (this.props.salvo) {
      return <Salvo length={length} color={this.colorSalvo()} />;
    }
  };

  ship = () => {
    if (this.props.isShip) {
      const borderStyle =
        styles[
          "shipHorizontal" +
            (this.props.horizontal ? "True" : "False") +
            "AndPart" +
            this.props.part
        ];
      return <View style={[styles.ship, borderStyle]} />;
    }
  };

  render() {
    let borderStyle = null;
    if (this.props.isShip) {
      borderStyle =
        styles[
          "squareHorizontal" +
            (this.props.horizontal ? "True" : "False") +
            "AndPart" +
            this.props.part
        ];
    }

    return (
      <View style={[styles.basic, borderStyle]}>
        {this.ship()}
        {this.titleOrSalvo()}
      </View>
    );
  }
}

export default SquarePlayerGrid;
