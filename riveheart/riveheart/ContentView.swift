//
//  ContentView.swift
//  riveheart
//
//  Created by Vikas Raj on 21/01/26.
//

import SwiftUI
import RiveRuntime
import AVFoundation

struct ContentView: View {
    @State private var riveVM: RiveViewModel?
    @State private var popPlayer: AVAudioPlayer?
    
    var body: some View {
        Group {
            if let riveVM {
                riveVM.view()
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .ignoresSafeArea(.all)
                     .onTapGesture {
                         playPop()
                         // If your Rive file has a trigger input named "popTrigger", this will fire it too:
                         // riveVM.triggerInput("popTrigger")
                     }
            } else {
                VStack(spacing: 12) {
                    Text("Missing riveheart.riv")
                        .font(.headline)
                    Text("Add `riveheart.riv` to the app target (Copy Bundle Resources), then rebuild.")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding()
            }
        }
        .onAppear {
            // Avoid RiveRuntime fatalError in SwiftUI previews / when the resource isn't bundled yet.
            if Bundle.main.url(forResource: "riveheart", withExtension: "riv") != nil {
                riveVM = RiveViewModel(fileName: "riveheart")
            }
            preparePopSound()
        }
    }

    private func preparePopSound() {
        guard popPlayer == nil else { return }
        guard let url = Bundle.main.url(forResource: "pop", withExtension: "wav") else { return }
        popPlayer = try? AVAudioPlayer(contentsOf: url)
        popPlayer?.prepareToPlay()
    }

    private func playPop() {
        if popPlayer == nil { preparePopSound() }
        popPlayer?.currentTime = 0
        popPlayer?.play()
    }
}

#Preview {
    ContentView()
}
