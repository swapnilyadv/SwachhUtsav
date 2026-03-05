import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#2E7D32',
  },
};

export default function AdminDashboardScreen({ navigation }) {
  const dataLine = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Waste Reports'],
  };

  const dataBar = {
    labels: ['Bio', 'Plastic', 'Glass', 'Paper', 'Metal'],
    datasets: [
      {
        data: [40, 60, 20, 35, 15],
      },
    ],
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Command Center</Text>
        <Text style={styles.subtitle}>SwachhUtsav Statistics</Text>
      </View>

      <View style={styles.statGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>152</Text>
          <Text style={styles.statLabel}>Total Reports</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>84%</Text>
          <Text style={styles.statLabel}>Resolution Rate</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
          <Text style={[styles.statValue, { color: '#2E7D32' }]}>12</Text>
          <Text style={styles.statLabel}>Active Collectors</Text>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>Reports Last 7 Days</Text>
        <LineChart
          data={dataLine}
          width={width - 48}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>Waste Composition</Text>
        <BarChart
          data={dataBar}
          width={width - 48}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          style={styles.chart}
        />
      </View>

      <TouchableOpacity 
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backBtnText}>Logout Admin</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 10,
    color: '#888',
    marginTop: 4,
  },
  chartSection: {
    marginBottom: 30,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  backBtn: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
