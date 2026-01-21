//
//  ContentView.swift
//  Aesthetic Button
//
//  Created by Vikas Raj on 13/11/25.
//

import SwiftUI

struct ContentView: View {
    @State private var timeOfDay: Float = 0
    @State private var timeString: String = ""
    @State private var timer: Timer?
    
    // Calculate normalized time of day (0.0 = midnight, 1.0 = next midnight)
    private func getTimeOfDay() -> Float {
        let calendar = Calendar.current
        let now = Date()
        let hour = Float(calendar.component(.hour, from: now))
        let minute = Float(calendar.component(.minute, from: now))
        let second = Float(calendar.component(.second, from: now))
        
        // Normalize to 0-1 range (24 hours = 1.0)
        return (hour * 3600 + minute * 60 + second) / 86400.0
    }
    
    // Format current time as a string (HH:mm:ss format)
    private func getTimeString() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm:ss"
        return formatter.string(from: Date())
    }
    
    // Get hour and minute separately for styling
    private func getHour() -> Int {
        Calendar.current.component(.hour, from: Date())
    }
    
    private func getMinute() -> Int {
        Calendar.current.component(.minute, from: Date())
    }
    
    var body: some View {
        ZStack()
        {
            
            VStack(spacing: 8) {
                // Main time display
                Text(timeString)
                    .font(.system(size: 36, weight: .light, design: .monospaced))
                    .foregroundStyle(.bar)
                    .tracking(0)
                    .contentTransition(.numericText())
                
            }
            
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .center)
        .background(
            Rectangle()
                .colorEffect(ShaderLibrary.colorShift(.float(timeOfDay)))
                .ignoresSafeArea()
        )
        .onAppear {
            timeOfDay = getTimeOfDay()
            timeString = getTimeString()
            // Update every second to reflect real time
            timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
                timeOfDay = getTimeOfDay()
                timeString = getTimeString()
            }
        }
        .onDisappear {
            timer?.invalidate()
        }
        
    }
}

#Preview {
    ContentView()
}
