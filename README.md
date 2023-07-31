# Voicify

Personal todo-list manager using voice. Purpose is to eliminate the need to **type** a list. Users can add, delete and clear all items from the list. Idea is that you can have a maximum of one list, so you complete all the elements in that list. Then you can rename the list for a different task. There's a TTS system that lets you know the status of each command.

## Instructions

Commands are:
- `create`: Changes name of list.
- `add [item]`: Adds `item` to list.
- `remove [item]`: Removes `item` to list.
- `clear`: Clears list.

## Todo
- Some parts don't work in Android.
- Add functionality to create multiple lists.
- Migrate STT to Whisper.

## Issues:
The `react-native-voice` library has a lot of issues with the speech decoding functions. To mitigate some of these, I've used the debounce function in `lodash` on the `onSpeechResults` method.

The speech-to-text is performed by Android/IOS's own internal modules so transcription issues remain. 
