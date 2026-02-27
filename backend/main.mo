import Array "mo:core/Array";
import Int "mo:core/Int";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

actor {
  type TestMode = {
    #words;
    #sentences;
    #custom;
  };

  type TestResult = {
    timestamp : Time.Time;
    wpm : Nat;
    accuracy : Float;
    testMode : TestMode;
    language : Text;
    difficulty : Text;
    duration : Nat;
  };

  module TestResult {
    public func compareByTimestamp(a : TestResult, b : TestResult) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let testResults = Map.empty<Principal, [TestResult]>();

  public shared ({ caller }) func submitTestResult(
    wpm : Nat,
    accuracy : Float,
    testMode : TestMode,
    language : Text,
    difficulty : Text,
    duration : Nat,
  ) : async () {
    let newTestResult : TestResult = {
      timestamp = Time.now();
      wpm;
      accuracy;
      testMode;
      language;
      difficulty;
      duration;
    };

    let currentResults = switch (testResults.get(caller)) {
      case (null) { [] };
      case (?results) { results };
    };

    let updatedResults = currentResults.concat([newTestResult]);
    testResults.add(caller, updatedResults);
  };

  public query ({ caller }) func getAllTestResults() : async [TestResult] {
    switch (testResults.get(caller)) {
      case (null) { [] };
      case (?results) { results };
    };
  };

  public query ({ caller }) func getTodaysResults() : async [TestResult] {
    let today = Time.now() / (24 * 60 * 60 * 1000000000);
    switch (testResults.get(caller)) {
      case (null) { [] };
      case (?results) {
        results.filter(
          func(result) {
            let resultDay = result.timestamp / (24 * 60 * 60 * 1000000000);
            resultDay == today;
          }
        );
      };
    };
  };

  public query ({ caller }) func getBestWPM() : async ?Nat {
    switch (testResults.get(caller)) {
      case (null) { null };
      case (?results) {
        if (results.size() == 0) { return null };
        var best = results[0].wpm;
        for (result in results.values()) {
          if (result.wpm > best) {
            best := result.wpm;
          };
        };
        ?best;
      };
    };
  };

  public query ({ caller }) func getAverageWPM() : async ?Float {
    switch (testResults.get(caller)) {
      case (null) { null };
      case (?results) {
        if (results.size() == 0) { return null };
        var total = 0;
        for (result in results.values()) {
          total += result.wpm;
        };
        ?(total.toFloat() / results.size().toInt().toFloat());
      };
    };
  };

  public query ({ caller }) func getAverageAccuracy() : async ?Float {
    switch (testResults.get(caller)) {
      case (null) { null };
      case (?results) {
        if (results.size() == 0) { return null };
        var total = 0.0;
        for (result in results.values()) {
          total += result.accuracy;
        };
        ?(total / results.size().toInt().toFloat());
      };
    };
  };

  public query ({ caller }) func getTotalTests() : async Nat {
    switch (testResults.get(caller)) {
      case (null) { 0 };
      case (?results) { results.size() };
    };
  };

  public query ({ caller }) func getDailyStreaks() : async Nat {
    switch (testResults.get(caller)) {
      case (null) { return 0 };
      case (?results) {
        let sortedResults = results.sort(TestResult.compareByTimestamp);
        var currentStreak = 1;
        var longestStreak = 1;
        var lastDay = sortedResults[0].timestamp / (24 * 60 * 60 * 1000000000);

        var i = 1;
        while (i < sortedResults.size() and i >= 0) {
          let resultDay = sortedResults[i].timestamp / (24 * 60 * 60 * 1000000000);
          if (resultDay == lastDay - 1) {
            currentStreak += 1;
            if (currentStreak > longestStreak) {
              longestStreak := currentStreak;
            };
          } else if (resultDay != lastDay) {
            currentStreak := 1;
          };
          lastDay := resultDay;
          i += 1;
        };
        longestStreak;
      };
    };
  };

  public query ({ caller }) func getStreakCalendar() : async [(Time.Time, Bool)] {
    switch (testResults.get(caller)) {
      case (null) { [] };
      case (?results) {
        let days = results.map(
          func(result) {
            (result.timestamp / (24 * 60 * 60 * 1000000000), true);
          }
        );
        days;
      };
    };
  };

  public query ({ caller }) func isRegistered() : async Bool {
    testResults.containsKey(caller);
  };

  public query ({ caller }) func getTestResult(index : Nat) : async TestResult {
    switch (testResults.get(caller)) {
      case (null) { Runtime.trap("No test results found") };
      case (?results) {
        if (index >= results.size()) {
          Runtime.trap("Index out of bounds");
        };
        results[index];
      };
    };
  };

  public query ({ caller }) func getTestResultRange(start : Nat, end : Nat) : async [TestResult] {
    switch (testResults.get(caller)) {
      case (null) { [] };
      case (?results) {
        let size = results.size();
        if (start >= size or end > size or start >= end) {
          Runtime.trap("Invalid range");
        };
        let newSize = end - start;
        results.sliceToArray(start, start + newSize);
      };
    };
  };
};
