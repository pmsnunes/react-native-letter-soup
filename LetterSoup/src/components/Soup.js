import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import { Letter } from './Letter';
import LetterComponent from './LetterComponent';

import * as types from '../redux/actions/types';


class SoupGame extends Component {

  l = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ã', 'Ç']

  letters = {};

  x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  words = []

  getRandomLetter() {
    return new Letter(this.l[Math.floor(Math.random() * 28)], -1, 'rgba(255, 255, 255, 0.6)');
  }

  componentWillMount() {
    this.generateWordSoup();
  }


  generateWordSoup() {

    const words = ["pmsnunes", "Betacode", "react", "native"]; 

    for (let x = 0; x < 10; x++) {

      this.letters[x] = {};

      for (let y = 0; y < 10; y++) {
        this.letters[x][y] = this.getRandomLetter();
      }
    }

    let numberOfWords = words.length;

    for (let w = 0; w < numberOfWords; w++) {
      this.addWord(words[w], w);
    }
  }

  addWord(word, id) {

    let x = this.getRandomCoordinate();
    let y = this.getRandomCoordinate();
    let direction = this.getRandomDirection();
    let canPlace = true;

    let wordLetters = word.toUpperCase().split('');

    if (direction === "HORIZONTAL") {

      if (x + word.length <= 10) {

        for (let i = 0; i < wordLetters.length; i++) {
          canPlace = canPlace && (this.letters[x + i][y].id === -1);
        }

        if (canPlace) {
          // console.log(x, y, direction, word, id)
          this.addHorizontalWord(wordLetters, x, y, id);
        } else {
          this.addWord(word, id);
        }

      } else {
        this.addWord(word, id);
      }

    } else if (direction === "VERTICAL") {
      if (y + word.length <= 10) {

        for (let i = 0; i < wordLetters.length; i++) {
          canPlace = canPlace && (this.letters[x][y + i].id === -1);
        }

        if (canPlace) {
          // console.log(x, y, direction, word, id)
          this.addVerticalWord(wordLetters, x, y, id);
        } else {
          this.addWord(word, id);
        }
      }
      else {
        this.addWord(word, id);
      }
    }
  }

  getRandomDirection() {
    let random = Math.random();

    if (random < 0.5) {
      return "HORIZONTAL";
    }

    return "VERTICAL";
  }

  getRandomCoordinate() {
    return Math.floor(Math.random() * 10);
  }

  addHorizontalWord(wordLetters, x, y, id) {
    this.words[id] = []

    for (let i = 0; i < wordLetters.length; i++) {
      this.letters[x + i][y] = new Letter(wordLetters[i], id, 'rgba(255, 255, 255, 0.6)');
      this.words[id].push({ x: x + i, y: y });
    }

  }

  addVerticalWord(wordLetters, x, y, id) {

    this.words[id] = []

    for (let i = 0; i < wordLetters.length; i++) {
      this.letters[x][y + i] = new Letter(wordLetters[i], id, 'rgba(255, 255, 255, 0.6)');
      this.words[id].push({ x: x, y: y + i });
    }
  }

  letterPress(id) {
    if (id !== -1) {
      locked = true;

      this.words[id].forEach(pos => {
        locked = locked && this.letters[pos.x][pos.y].selected;

      });

      if (locked) {
        this.words[id].forEach(pos => {
          this.letters[pos.x][pos.y].setColor('#00BE6E')
          this.letters[pos.x][pos.y].lock()
        });


       // this.props.onWordComplete(id);

        this.props.dispatch({
          type: types.SOUP_DECREMENT_VALUE,
          value: this.words[id].length
        })

        this.forceUpdate();



      }
    }
  }

  k = 0;
  render() {
    x = 0;
    y = 0;
    return (
      <View style={styles.soup}>
        {
          this.x.map(x =>
            this.y.map(y =>
              <LetterComponent
                key={this.k++}
                x={x}
                y={y}
                letter={this.letters[x][y]}
                press={(id) => this.letterPress(id)}
              />
            )
          )
        }
      </View>

    )
  }
}

// const mapStateToProps = state => ({

// });

export default connect()(SoupGame);


const styles = StyleSheet.create({
  soup: {
    height: Dimensions.get('window').width,
  }
})