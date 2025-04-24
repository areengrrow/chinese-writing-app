// components/CharacterPracticeDocument.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 24,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  characterBox: {
    fontSize: 48,
    textAlign: 'center',
    border: '1px solid #000',
    padding: 20,
    marginVertical: 10,
  },
});

const CharacterPracticeDocument = ({ character }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.label}>Character to Practice:</Text>
        <Text style={styles.characterBox}>{character}</Text>
      </View>
      {/* You can add more content here based on your CharacterPractice component */}
      {/* For example, rendering practice grids or additional information */}
    </Page>
  </Document>
);

export default CharacterPracticeDocument;