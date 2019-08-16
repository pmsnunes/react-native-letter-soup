import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import * as types from '../redux/actions/types';


let size = Dimensions.get('window').width / 10;

class LetterComponent extends Component {

    x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


    updateColor() {
        let {
            letter,
            press, 
            counter,
        } = this.props;

        console.log(counter)

        if(!letter.locked){
            letter.toggleSelect();

            if (letter.selected) {

                if(counter<10){
                    letter.setColor('rgba(0,190,110, 0.6)');
                    this.props.dispatch({
                        type: types.SOUP_INCREMENT
                    })
                }
                
            } else {
                letter.setColor('rgba(255, 255, 255, 0.6)');
                this.props.dispatch({
                    type: types.SOUP_DECREMENT
                })
            }

            this.forceUpdate();            
        }      
        
        press(letter.id);

    }


    render() {
        const {
            x, y, letter, press
        } = this.props;
        return (
            <Animated.View
                style={{
                    ...styles.piece,
                    transform: [
                        { translateX: size * x },
                        { translateY: size * y }
                    ],
                    backgroundColor: letter.getColor()
                }}
            >
                <TouchableOpacity
                    style={styles.pieceButton}
                    onPress={() => {
                        this.updateColor();                        
                    }}
                    disabled={letter.locked}
                >
                    <Text style={styles.letter}>
                        {letter.letter}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const mapStateToProps = state => ({
    counter: state.soup.counter
});

export default connect(mapStateToProps)(LetterComponent);


const styles = StyleSheet.create({
    piece: {
        width: size,
        height: size,
        position: 'absolute',
    },
    pieceButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0, 0, 0, 0.6)',
        borderWidth: 1,
    },
    letter: {
        fontFamily: 'Montserrat-Bold',
        color: '#000000',
        fontSize: 14,
    }
})