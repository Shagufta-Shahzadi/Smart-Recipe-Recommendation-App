import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, StyleSheet, Dimensions, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

// Replace with your actual logo import
const logo = require('../assets/logo.png');

export default function SplashScreen({ navigation }) {
  // Core animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const logoYPosition = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Text animations
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const titleYPosition = useRef(new Animated.Value(20)).current;
  const subtitleYPosition = useRef(new Animated.Value(20)).current;
  
  // Loading bar animations
  const loadingWidth = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  
  // Floating icon animations (6 icons - 2 top, 2 sides, 2 bottom)
  const floatingIcons = Array(6).fill().map(() => ({
    position: useRef(new Animated.Value(0)).current,
    rotation: useRef(new Animated.Value(0)).current,
    scale: useRef(new Animated.Value(0)).current,
    opacity: useRef(new Animated.Value(0)).current
  }));
  
  // Particle animations
  const particles = Array(12).fill().map(() => ({
    position: useRef(new Animated.Value(0)).current,
    opacity: useRef(new Animated.Value(0)).current
  }));

  useEffect(() => {
    // Start with logo animation
    Animated.sequence([
      // Initial fade and scale
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }),
        Animated.timing(logoYPosition, {
          toValue: 0,
          duration: 1200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      
      // Then reveal text with staggered animation
      Animated.stagger(200, [
        Animated.parallel([
          Animated.timing(titleOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(titleYPosition, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(subtitleOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(subtitleYPosition, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]),
      
      // Finally show loading bar
      Animated.parallel([
        Animated.timing(loadingOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(loadingWidth, {
          toValue: 1,
          duration: 12000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    ]).start();
    
    // Setup continuous pulse animation for the logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animate floating icons - positioned around the screen (top, sides, bottom)
    floatingIcons.forEach((icon, index) => {
      // Initial appearance with delay
      Animated.sequence([
        Animated.delay(800 + (index * 150)),
        Animated.timing(icon.opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(icon.scale, {
          toValue: 1,
          duration: 800,
          easing: Easing.elastic(1.2),
          useNativeDriver: true,
        }),
      ]).start();
      
      // Continuous floating motion
      Animated.loop(
        Animated.sequence([
          Animated.timing(icon.position, {
            toValue: 1,
            duration: 3000 + (index * 500),
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(icon.position, {
            toValue: 0,
            duration: 3000 + (index * 500),
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
      
      // Continuous rotation
      Animated.loop(
        Animated.timing(icon.rotation, {
          toValue: 1,
          duration: 6000 + (index * 1000),
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    });
    
    // Animate particles
    particles.forEach((particle, index) => {
      // Random timing for natural effect
      const startDelay = Math.random() * 5000;
      const duration = 3000 + (Math.random() * 2000);
      
      // Loop each particle with different timing
      Animated.loop(
        Animated.sequence([
          Animated.delay(startDelay),
          Animated.parallel([
            Animated.timing(particle.position, {
              toValue: 1,
              duration: duration,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(particle.opacity, {
              toValue: 0.7,
              duration: duration * 0.3,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.delay(duration * 0.7),
              Animated.timing(particle.opacity, {
                toValue: 0,
                duration: duration * 0.3,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.delay(Math.random() * 1000),
        ])
      ).start();
    });

    // Navigate to next screen after 14 seconds with exit animation
    const timer = setTimeout(() => {
      // Exit animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.replace("StartScreen");
      });
    }, 14000);

    return () => clearTimeout(timer);
  }, []);

  // Spin interpolation for logo
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '0deg'],
  });
  
  // Calculate positions and transformations for floating icons
  const getIconTransform = (index, animation) => {
    // Different paths for each icon (top, sides, bottom)
    const paths = [
      // Top left icon
      { x: [-width * 0.25, -width * 0.15], y: [-height * 0.15, -height * 0.05], rotate: ['0deg', '360deg'] },
      // Top right icon
      { x: [width * 0.25, width * 0.15], y: [-height * 0.15, -height * 0.05], rotate: ['0deg', '-360deg'] },
      // Left side icon
      { x: [-width * 0.3, -width * 0.2], y: [0, height * 0.05], rotate: ['0deg', '280deg'] },
      // Right side icon
      { x: [width * 0.3, width * 0.2], y: [0, -height * 0.05], rotate: ['0deg', '-300deg'] },
      // Bottom left icon
      { x: [-width * 0.25, -width * 0.15], y: [height * 0.15, height * 0.1], rotate: ['0deg', '330deg'] },
      // Bottom right icon
      { x: [width * 0.25, width * 0.15], y: [height * 0.15, height * 0.1], rotate: ['0deg', '-320deg'] },
    ];
    
    const path = paths[index % paths.length];
    
    return [
      {
        translateX: animation.position.interpolate({
          inputRange: [0, 1],
          outputRange: path.x,
        }),
      },
      {
        translateY: animation.position.interpolate({
          inputRange: [0, 1],
          outputRange: path.y,
        }),
      },
      {
        scale: animation.scale.interpolate({
          inputRange: [0, 1],
          outputRange: [0.4, 1],
        }),
      },
      {
        rotate: animation.rotation.interpolate({
          inputRange: [0, 1],
          outputRange: path.rotate,
        }),
      },
    ];
  };
  
  // Calculate particle animations
  const getParticleStyle = (index) => {
    // Random positions for a more natural effect
    const randomAngle = Math.PI * 2 * (index / particles.length);
    const distance = 150 + (index % 3) * 50;
    
    const startX = 0;
    const startY = 0;
    const endX = Math.cos(randomAngle) * distance;
    const endY = Math.sin(randomAngle) * distance;
    
    return {
      position: 'absolute',
      width: 4 + (index % 3) * 2,
      height: 4 + (index % 3) * 2,
      borderRadius: 50,
      backgroundColor: index % 2 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,200,0.7)',
      opacity: particles[index].opacity,
      transform: [
        {
          translateX: particles[index].position.interpolate({
            inputRange: [0, 1],
            outputRange: [startX, endX],
          }),
        },
        {
          translateY: particles[index].position.interpolate({
            inputRange: [0, 1],
            outputRange: [startY, endY],
          }),
        },
      ],
    };
  };

  // Get the right icon for each floating element
  const getIcon = (index) => {
    const icons = [
      <MaterialCommunityIcons name="silverware-spoon" size={24} color="rgba(255,255,255,0.9)" />,
      <FontAwesome5 name="utensils" size={20} color="rgba(255,255,255,0.9)" />,
      <MaterialCommunityIcons name="food-apple" size={24} color="rgba(255,255,255,0.9)" />,
      <Ionicons name="fast-food-outline" size={24} color="rgba(255,255,255,0.9)" />,
      <MaterialCommunityIcons name="cupcake" size={24} color="rgba(255,255,255,0.9)" />,
      <FontAwesome5 name="ice-cream" size={20} color="rgba(255,255,255,0.9)" />,
    ];
    return icons[index % icons.length];
  };

  return (
    <LinearGradient
      colors={['#14532d', '#166534', '#15803d']} // Green theme gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Background design elements */}
      <View style={styles.backgroundDesign}>
        <View style={styles.circleLarge} />
        <View style={styles.circleMedium} />
        <View style={styles.circleSmall} />
      </View>
      
      {/* Particle effects */}
      {particles.map((_, index) => (
        <Animated.View key={`particle-${index}`} style={getParticleStyle(index)} />
      ))}
      
      {/* Floating icons (positioned around the screen) */}
      {floatingIcons.map((icon, index) => (
        <Animated.View
          key={`icon-${index}`}
          style={[
            styles.floatingIcon,
            {
              transform: getIconTransform(index, icon),
              opacity: icon.opacity,
            },
          ]}
        >
          {getIcon(index)}
        </Animated.View>
      ))}
      
      {/* Main content */}
      <View style={styles.contentContainer}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [
                { scale: Animated.multiply(scaleAnim, pulseAnim) },
                { translateY: logoYPosition },
                { rotate: spin }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={['#22c55e', '#16a34a', '#15803d']} // Green logo gradient
            style={styles.logoGradient}
          >
            <Image 
              source={logo} 
              style={styles.logoImage}
              resizeMode="contain"
            />
          </LinearGradient>
          <View style={styles.logoShadow} />
        </Animated.View>
        
        {/* Text content */}
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.title,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleYPosition }]
              }
            ]}
          >
            Flavor Fusion
          </Animated.Text>
          
          <Animated.Text
            style={[
              styles.subtitle,
              {
                opacity: subtitleOpacity,
                transform: [{ translateY: subtitleYPosition }]
              }
            ]}
          >
            Craft • Discover • Delight
          </Animated.Text>
        </View>
      </View>
      
      {/* Loading area */}
      <Animated.View 
        style={[
          styles.loadingContainer,
          { opacity: loadingOpacity }
        ]}
      >
        <Text style={styles.loadingText}>
          Preparing culinary excellence...
        </Text>
        <View style={styles.loadingBarContainer}>
          <View style={styles.loadingBarBackground}>
            <Animated.View 
              style={[
                styles.loadingBarFill,
                {
                  width: loadingWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  })
                }
              ]} 
            />
          </View>
        </View>
      </Animated.View>
      
      {/* Version number */}
      <Text style={styles.versionText}>v 2.0</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  backgroundDesign: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circleLarge: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: 'rgba(34, 197, 94, 0.06)',
    top: -width * 0.5,
    left: -width * 0.25,
  },
  circleMedium: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    bottom: -width * 0.4,
    right: -width * 0.3,
  },
  circleSmall: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    top: height * 0.2,
    left: -width * 0.4,
  },
  floatingIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(21, 128, 61, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 150,
    height: 150,
    marginBottom: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoGradient: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoImage: {
    width: '80%',
    height: '80%',
  },
  logoShadow: {
    position: 'absolute',
    width: 130,
    height: 20,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    bottom: -15,
    transform: [{ scaleX: 0.8 }],
    zIndex: -1,
    opacity: 0.5,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
    width: '100%',
  },
  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "white",
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: "#E5E7EB",
    letterSpacing: 2.5,
    fontWeight: "300",
    textAlign: 'center',
  },
  loadingContainer: {
    position: "absolute",
    bottom: 60,
    width: "75%",
    alignItems: "center",
  },
  loadingText: {
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 12,
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: "300",
  },
  loadingBarContainer: {
    width: "100%",
    alignItems: "center",
  },
  loadingBarBackground: {
    width: "100%",
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 4,
    overflow: "hidden",
  },
  loadingBarFill: {
    height: "100%",
    backgroundColor: "#22c55e",
    borderRadius: 4,
  },
  versionText: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
});