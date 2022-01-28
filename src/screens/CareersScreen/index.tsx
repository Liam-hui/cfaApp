import React, { useState } from 'react';
import MyWebView from '@/components/MyWebView';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function CareersScreen() {

  const [mode, setMode] = useState<"jobSeeker" | "employer">("jobSeeker");

  return (
    <MyWebView
      uri={mode == "jobSeeker" ? "https://cfasocietyhongkong.org/for-job-seekers/" : "https://cfasocietyhongkong.org/for-employers/"}
      headerAction={
        <TouchableOpacity
          style={{
            backgroundColor: Colors.blue,
            height: 35,
            paddingHorizontal: 10,
            borderRadius: 35,
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => {
            setMode(mode == "jobSeeker" ? "employer" : "jobSeeker");
          }}
        >
          <Text style={{ color: "white" }}>{mode == "jobSeeker" ? "For Employers" : "For Job Seekers"}</Text>
        </TouchableOpacity>
      }
    />
  );
}

