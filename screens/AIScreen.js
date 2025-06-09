import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const AIScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(); // Reference for ScrollView to auto-scroll

  // ✅ Replace with your actual IP address
  const backendUrl = 'http://192.168.1.7:5000';

  // Load chat history from storage when component mounts
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Function to load chat history
  const loadChatHistory = async () => {
    try {
      // Here you would typically load from AsyncStorage
      // For now, we'll just use dummy data for demonstration
      // In a real app, you'd use:
      // const savedHistory = await AsyncStorage.getItem('chatHistory');
      // if (savedHistory) setHistory(JSON.parse(savedHistory));
      
      // Dummy data for demonstration
      const dummyHistory = [
        { message: "Welcome! What ingredients do you have?", timestamp: new Date().toLocaleString(), type: 'ai' }
      ];
      
      setHistory(dummyHistory);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  // Function to save chat history
  const saveChatHistory = async (updatedHistory) => {
    try {
      // Here you would typically save to AsyncStorage
      // In a real app, you'd use:
      // await AsyncStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
      
      console.log('Chat history saved');
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  // Function to clear chat history
  const clearChatHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all chat history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          onPress: async () => {
            setHistory([]);
            // In a real app, you'd clear AsyncStorage:
            // await AsyncStorage.removeItem('chatHistory');
            Alert.alert('Success', 'Chat history cleared');
          }, 
          style: 'destructive' 
        },
      ]
    );
  };

  const getRecipeRecommendations = async (message) => {
    try {
      // Changed endpoint to match Flask backend
      const response = await axios.post(`${backendUrl}/get-recipes`, {
        ingredients: message.split(' '),
      });

      // Adjust key to match Flask backend response format
      return response.data.recipes || []; 
    } catch (error) {
      console.error('Error fetching recipe recommendations:', error);
      Alert.alert('Error', 'Failed to fetch recommendations. Please try again.');
      return null;
    }
  };

  const handleSend = async () => {
    if (message.trim() === '') {
      Alert.alert('Error', 'Please enter a message!');
      return;
    }

    setIsLoading(true);
    const userMessage = { message, timestamp: new Date().toLocaleString(), type: 'user' };

    try {
      const updatedHistory = [...history, userMessage];
      setHistory(updatedHistory);

      const recommendations = await getRecipeRecommendations(message);

      let finalHistory = updatedHistory;
      if (recommendations && recommendations.length > 0) {
        const aiResponse = {
          message: `Here are some recommendations:\n${recommendations.map(r => `• ${r.title}`).join('\n')}`,
          timestamp: new Date().toLocaleString(),
          type: 'ai',
        };
        finalHistory = [...updatedHistory, aiResponse];
      } else {
        const aiResponse = {
          message: "I couldn't find any recipes with those ingredients. Try different ingredients or combinations.",
          timestamp: new Date().toLocaleString(),
          type: 'ai',
        };
        finalHistory = [...updatedHistory, aiResponse];
      }

      setHistory(finalHistory);
      saveChatHistory(finalHistory); // Save updated history
      setMessage('');
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [history]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.keyboardAvoidContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={styles.curvedHeader}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Welcome Back!</Text>
                <Text style={styles.subHeaderText}>Chat with AI</Text>
                
                {/* History clear button */}
                <TouchableOpacity style={styles.historyButton} onPress={clearChatHistory}>
                  <Icon name="history" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.botImageContainer}>
                <Image source={require('../assets/ai.jpg')} style={styles.botImage} />
              </View>
            </View>

            {/* Chat History */}
            <ScrollView 
              style={styles.historyContainer}
              ref={scrollViewRef}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}
            >
              {history.map((entry, index) => (
                <View
                  key={index}
                  style={[
                    styles.historyItem,
                    entry.type === 'user' ? styles.userMessage : styles.aiMessage,
                  ]}
                >
                  <Text style={styles.historyMessage}>{entry.message}</Text>
                  <Text style={styles.timestamp}>{entry.timestamp}</Text>
                </View>
              ))}
              {isLoading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#009EA9" />
                </View>
              )}
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type your ingredients..."
                placeholderTextColor="#000"
                value={message}
                onChangeText={setMessage}
                editable={!isLoading}
              />
              <TouchableOpacity style={styles.iconButton} onPress={handleSend} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="green" />
                ) : (
                  <Icon name="send" size={24} color="green" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidContainer: {
    flex: 1,
    paddingBottom: 60, // Space for the footer
  },
  innerContainer: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
  },
  curvedHeader: {
    width: '100%',
    height: 170,
    backgroundColor: '#009EA9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  historyButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    top: -15,
  },
  subHeaderText: {
    color: '#fff',
    fontSize: 20,
    top: -15,
  },
  botImageContainer: {
    marginTop: -40,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
    elevation: 5,
  },
  botImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  historyContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  historyItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#F0F0F0',
    alignSelf: 'flex-start',
  },
  historyMessage: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 10,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    marginBottom: -40,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    color: '#000',
  },
  iconButton: {
    padding: 10,
  },
});

export default AIScreen;