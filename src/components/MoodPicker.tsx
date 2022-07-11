import React from 'react';
import { View, Text,StyleSheet,Pressable, Image } from 'react-native';
import { MoodOptionType } from '../types';
import { theme } from '../theme';

const moodOptions : MoodOptionType[] = [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
  ];

type MoodPickerProps = {
  onSelect: (mood : MoodOptionType) => void;
};

const imageSrc = require('../../assets/butterflies.png');

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelect }) => {
  const [selectedMood,setSelectedMood] = React.useState<MoodOptionType>();
  const [hasSelected,setHasSelected] = React.useState(false);

  const handleSelect = React.useCallback(() => {
    if(selectedMood){
      onSelect(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelect,selectedMood])

  if(hasSelected){
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable
          style={styles.button}
          onPress={() => setHasSelected(false)}
        >
          <Text style={styles.buttonText}>Choose another!</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
        <View style={styles.moodOptions}>
          {moodOptions.map((option) => (
            <View
            key={option.emoji}
            >
              <Pressable 
              onPress={() => setSelectedMood(option)}
              style= {[styles.moodItem, selectedMood?.emoji === option.emoji ? styles.selectedMoodItem : undefined]}
              >
                <Text key={option.emoji}>{option.emoji}</Text>
              </Pressable>
              <Text style={styles.descriptionText}>{selectedMood?.description === option.description ? option.description : undefined}</Text>
            </View>
          ))}
        </View>

        <Pressable
          style={styles.button}
          onPress={handleSelect}
        >
          <Text style={styles.buttonText}>Choose</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    moodOptions : {
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    moodItem : {
        height : 60,
        width : 60,
        borderRadius : 30,
        justifyContent : 'center',
        alignItems : 'center',
        marginBottom: 5,
    },
    selectedMoodItem : {
        backgroundColor : theme.colorPurple,
        borderColor : theme.colorWhite,
        borderWidth : 2
    },
    descriptionText: {
      color: theme.colorPurple,
      fontSize: 10,
      textAlign : 'center',
      fontFamily : theme.fontFamilyBold
    },
    container: {
      height: 250,
      borderWidth : 2,
      borderColor : theme.colorPurple,
      margin: 10,
      borderRadius : 10,
      padding : 20,
      backgroundColor: 'rgba(0,0,0,0.2)',
      justifyContent: 'space-between'
    },
    heading: {
      fontSize: 20,
      letterSpacing: 1,
      textAlign: 'center',
      marginBottom: 20,
      color : theme.colorWhite,
      fontFamily: theme.fontFamilyBold
    },
    button: {
      backgroundColor: theme.colorPurple,
      width: 150,
      borderRadius: 20,
      marginTop: 20,
      alignSelf: 'center',
      padding: 10,
    },
    buttonText: {
      color: theme.colorWhite,
      textAlign: 'center',
      fontFamily : theme.fontFamilyBold
    },
    image : {
      alignSelf : 'center'
    }
})
